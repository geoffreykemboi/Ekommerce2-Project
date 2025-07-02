import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create a new order => /api/v1/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentMethod,
        itemPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});

// Get order details => /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Get current user's orders => /api/v1/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});

//get all orders - ADMIN => /api/v1/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalAmount;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// Update order status - ADMIN => /api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
    console.log("🚀 UPDATE ORDER CONTROLLER HIT!");
    console.log("Update order requested for ID:", req.params.id);
    console.log("Request body:", req.body);
    console.log("User:", req.user?.email, "Role:", req.user?.role);
    
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new ErrorHandler("Invalid order ID format", 400));
    }
    
    const order = await Order.findById(req.params.id);

    if (!order) {
        console.log("Order not found with ID:", req.params.id);
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    console.log("Order found:", order._id, "Current status:", order.orderStatus);

    if (order?.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    // Validate status
    const validStatuses = ["Processing", "Shipped", "Delivered"];
    if (!validStatuses.includes(req.body.status)) {
        return next(new ErrorHandler("Invalid order status", 400));
    }

    // Only update product stock if the order is being marked as delivered
    // and it hasn't been delivered before
    if (req.body.status === "Delivered" && order.orderStatus !== "Delivered") {
        // Check if all products exist before updating stock
        const missingProducts = [];
        const stockIssues = [];
        
        for (const item of order.orderItems) {
            const product = await Product.findById(item.product.toString());
            if (!product) {
                missingProducts.push(item.product);
                continue;
            }
            if (product.stock < item.quantity) {
                stockIssues.push(`Product "${product.name}" has insufficient stock (${product.stock} available, ${item.quantity} needed)`);
            }
        }
        
        // If there are missing products, log warning but continue with order update
        if (missingProducts.length > 0) {
            console.warn(`Warning: Some products from order ${order._id} no longer exist:`, missingProducts);
            // Don't fail the order update, just log the warning
        }
        
        // If there are stock issues, return error
        if (stockIssues.length > 0) {
            return next(new ErrorHandler(`Stock issues: ${stockIssues.join(', ')}`, 400));
        }
        
        // Update stock only for existing products
        for (const item of order.orderItems) {
            const product = await Product.findById(item.product.toString());
            if (product) {  // Only update if product exists
                product.stock -= item.quantity;
                await product.save({ validateBeforeSave: false });
            }
        }
        
        order.deliveredAt = Date.now();
    }

    order.orderStatus = req.body.status;
    await order.save();

    res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        order
    });
});


// Delete order - ADMIN => /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
        message: "Order deleted successfully",
    });
});


/**
 * @summary Helper function to get dates between a start and end date
 * @param {Date} startDate - The start date
 * @param {Date} endDate - The end date
 * @returns {string[]} An array of formatted date strings (YYYY-MM-DD)
 */
function getDatesBetween(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        const formattedDate = currentDate.toISOString().split('T')[0];
        dates.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

async function getSalesData(startDate, endDate) {
    try {
        // 1. Get sales data from MongoDB using the aggregation pipeline
        const salesData = await Order.aggregate([
            {
                // Stage 1: Filter documents to match the date range
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },
            {
                // Stage 2: Group documents by date and calculate totals
                $group: {
                    _id: {
                       date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    },
                    totalSales: { $sum: "$totalAmount" },
                    numOrders: { $sum: 1 },
                },
            },
        ]);

        // 2. Create a map of sales data for efficient lookup
        const salesMap = new Map();
        salesData.forEach((entry) => {
            salesMap.set(entry._id.date, {
                sales: entry.totalSales,
                numOrders: entry.numOrders,
            });
        });

        // 3. Generate a list of all dates within the range
        const datesBetween = getDatesBetween(startDate, endDate);

        // 4. Create the final sales data array, filling in 0 for dates with no sales
        const finalSalesData = datesBetween.map((date) => ({
            date,
            sales: (salesMap.get(date) || { sales: 0 }).sales,
            numOrders: (salesMap.get(date) || { numOrders: 0 }).numOrders,
        }));
        
        // 5. Calculate total sales and orders from the original sales data
        const totalSales = salesData.reduce((acc, entry) => acc + entry.totalSales, 0);
        const totalNumOrders = salesData.reduce((acc, entry) => acc + entry.numOrders, 0);

        return {
            totalSales,
            totalNumOrders,
            sales: finalSalesData,
        };

    } catch (error) {
        console.error("Error in getSalesData:", error);
        throw error;
    }
}


// Get Sales Data for Admin Dashboard => /api/v1/admin/get_sales
export const getSales = catchAsyncErrors(async (req, res, next) => {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);      
      
    // Set time to ensure the full day range is included
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    const { sales, totalSales, totalNumOrders } = await getSalesData(startDate, endDate);

    res.status(200).json({     
        success: true,    
        totalSales, 
        totalNumOrders,
        sales, // This now contains the array of daily sales data
    });
});

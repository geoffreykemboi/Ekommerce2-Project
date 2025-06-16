import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"; // Fixed import path
import Product from "../models/product.js"; // Corrected import variable name
import Order from "../models/order.js"; // Corrected import variable name
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
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Get current user's orders => /api/v1/me/orders
export const  myOrders = catchAsyncErrors(async (req, res, next) => {
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
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    if (order?.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    order?.orderItems?.forEach(async (item) => {
        const product = await Product.findById(item?.product);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }   
        product.stock = product.stock - item.quantity;
        await product.save();
    });

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    order?.orderItems.forEach((item) => {
        item.status = req.body.status;
    });

    res.status(200).json({
        success: true,
        order,
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
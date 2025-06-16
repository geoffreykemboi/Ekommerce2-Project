import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        shippingInfo: {
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true  
        },
        orderItems: [
            {
                name: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
            },
        ],
        paymentMethod: {
            type: String,
            required: [true, 'Please select a payment method'],
            enum: {
                values: ['Cash on Delivery', 'Online Payment'],
                message: 'Please select a valid payment method',
            },
        },
        paymentInfo: {
            id: {
                type: String,
            },
            status: {
                type: String,
            }
        },
        itemPrice: {
            type: Number,
            required: true
        },
        taxAmount: {
            type: Number,
            required: true
        },
        shippingAmount: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        paidAt: {
            type: Date,
        },
        deliveredAt: {
            type: Date,
        },
        orderStatus: {
            type: String,
            required: true,
            default: 'Processing',
            enum: {
                values: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
                message: 'Please select a valid order status',
            },
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
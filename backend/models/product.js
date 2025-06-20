import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        // REFINEMENT: Use 'max' for numbers instead of 'maxLength'.
        // This sets a maximum price value, e.g., 99999.
        max: [99999, "Product price cannot exceed 5 digits"],
        default: 0.0,
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        },
    ],
    category: {
        type: String,
        required: [true, "Please enter the product category"],
        enum: {
            values: [
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Clothes/Shoes",
                "Beauty/Health",
                "Sports",
                "Outdoor",
            ],
            message: "Please select valid category",
        },
    },
    seller: {
        type: String,
        required: [true, "Please enter product seller"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        // REFINEMENT: Use 'max' for numbers.
        max: [99999, "Product stock cannot exceed 5 digits"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            // REFINEMENT: A review should always be linked to a user.
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        },
    ],
    // This field tracks which user created the product.
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // REFINEMENT: It's good practice to require a product to have a creator.
        required: true,
    },
    }, { timestamps: true });

export default mongoose.model("Product", productSchema);
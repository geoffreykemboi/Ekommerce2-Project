// backend/controllers/productControllers.js (Regenerated and Final Version)

import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";
import { upload_file, delete_file } from "../utils/cloudinary.js";

// Get all products => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();

  const apiFilters = new APIFilters(Product.find(), req.query);

  apiFilters.search();
  apiFilters.filter();

  let products = await apiFilters.query;
  const filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);
  
  products = await apiFilters.query.clone();

  res.status(200).json({
    productsCount,
    resPerPage,
    filteredProductsCount,
    products,
  });
});

// Create a new product => POST /api/v1/products
export const newProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(201).json({
    product,
  });
});

// Get single product details => GET /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    product,
  });
});

// Get products - ADMIN => GET /api/v1/admin/products
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    products,
  });
});

// Update product details => PUT /api/v1/products/:id
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
    new: true 
  });
  res.status(200).json({
    product,
  });
});

// Upload product images => POST /api/v1/admin/products/:id/upload_images
export const uploadProductImages = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  
  // This check ensures the code doesn't crash if no images are sent
  if (!req.body.images || req.body.images.length === 0) {
    return next(new ErrorHandler("Please provide images to upload.", 400));
  }

  const uploader = async (image) => upload_file(image, "shopit/products");
  const urls = await Promise.all(req.body.images.map(uploader));

  product.images.push(...urls);
  await product.save();

  res.status(200).json({
    product,
  });
});

// Delete product image => DELETE /api/v1/admin/products/:id/delete_image
export const deleteProductImage = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const image_public_id = req.body.imgId;

    if (!image_public_id) {
        return next(new ErrorHandler("Please provide an image ID to delete.", 400));
    }

    // Delete the image from Cloudinary
    await delete_file(image_public_id);

    // Filter out the image from the product's images array in the database
    product.images = product.images.filter(
        (img) => img.public_id.toString() !== image_public_id.toString()
    );

    await product.save();

    res.status(200).json({
        success: true,
        product,
    });
});

// Delete product => DELETE /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Delete image associated with the product
  for (let i=0; i < product.images.length; i++) {
    await delete_file(product?.images[i].public_id);
  }

  await product.deleteOne();
  res.status(200).json({
    message: "Product deleted",
  });
});

// --- REVIEWS ---

// Create or update a product review => PUT /api/v1/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.comment = comment;
        rev.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
  }

  product.numOfReviews = product.reviews.length;
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Get product reviews => GET /api/v1/reviews
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    reviews: product.reviews,
  });
});

// Delete product review => DELETE /api/v1/admin/reviews
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  const numOfReviews = reviews.length;
  const ratings =
    numOfReviews === 0
      ? 0
      : reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, numOfReviews, ratings },
    { new: true }
  );
  res.status(200).json({
    success: true,
  });
});
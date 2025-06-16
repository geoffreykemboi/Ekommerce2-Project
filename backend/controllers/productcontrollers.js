import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";


export const getProducts = catchAsyncErrors(async (req, res) => {
  resPerPage = 4; // Number of products per page, can be adjusted as needed   
  const apiFilters = new APIFilters(Product, req.query).search();

  let products = await apiFilters.query;
  let filteredProductsCount = products.length;

  // Apply pagination if needed
  apiFilters.pagination(resPerPage); // Assuming 10 products per page
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    filteredProductsCount, 
    products, // This will return all products   
  });
});

// Create a new product
export const newProduct = catchAsyncErrors(async (req, res) => {

  req.user._id = req.user._id; // Ensure the user ID is set from the authenticated user

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

// Get a single product details => /api/v1/product/:id
export const getProductDetails = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update product details => /api/v1/product/:id
export const updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product => /api/v1/product/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await Product.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
});

// Create/Update product review => /api/v1/review
export const createProductReview = catchAsyncErrors(async (req, res) => {

  const { rating, comment, productId } = req.body;

  const review = {
    user: req?.user?._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
     }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (review?.user?._id.toString() === req?.user?._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review added successfully",
  });
});

// Get Product Reviews => /api/v1/reviews
export const getProductReviews = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.query.productId);

  if (!product) { 
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

/// Delete product review => /api/v1/admin/reviews
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    
    product.reviews = product.reviews.filter(                                   // Remove the review matching the query ID
        (review) => review._id.toString() !== req.query.id.toString()
    );

    product.numOfReviews = product.reviews.length;                              // Corrected: Use the updated reviews array
   
    product.ratings =                                                           // Ensure ratings calculation does not divide by zero
        product.reviews.length > 0
            ? product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
            : 0;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

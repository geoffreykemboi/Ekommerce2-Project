// backend/routes/products.js (The final version to fix all issues)

import express from 'express';
import { 
    createProductReview,
    deleteProduct, 
    deleteReview, 
    getProductDetails, 
    getProducts, 
    newProduct, 
    updateProduct, 
    getAdminProducts,
    uploadProductImages,
    deleteProductImage
} from '../controllers/productControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();

// Handles the HOMEPAGE (GET /api/v1/products) and creating new products (POST /api/v1/products)
router
.route("/products")
.get(getProducts)
.post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

// Handles the PRODUCT DETAILS page (GET /api/v1/products/:id) and updating/deleting products
router
.route("/products/:id")
.get(getProductDetails)
.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// Handles GETting all products for the admin dashboard
router
.route("/admin/products")
.get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
.route("/admin/products/:id/upload_images")
.post(isAuthenticatedUser, authorizeRoles("admin"), uploadProductImages);

router
.route("/admin/products/:id/delete_image")
.put(isAuthenticatedUser, authorizeRoles("admin"), deleteProductImage);

// --- REVIEW ROUTES ---
router.route("/reviews").put(isAuthenticatedUser, createProductReview);
router.route("/admin/reviews").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);
   
export default router;


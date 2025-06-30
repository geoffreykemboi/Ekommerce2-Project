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

// Handles the HOMEPAGE (GET /api/v1/products)
router.route("/products").get(getProducts);

// Handles the PRODUCT DETAILS page (GET /api/v1/products/:id)
router.route("/products/:id").get(getProductDetails);

// It creates the path: POST /api/v1/admin/products
router
.route("/products")
.post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

// Handles GETting all products for the admin dashboard
router
.route("/admin/products")
.get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

// Handles UPDATING a product
router
.route("/products/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

// Handles DELETING a product
router
.route("/products/:id")
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
.route("/admin/products/:id/upload_images")
.post(isAuthenticatedUser, authorizeRoles("admin"), uploadProductImages);

router
.route("/admin/products/:id/delete_image")
.put(isAuthenticatedUser, authorizeRoles("admin"), deleteProductImage);


// --- REVIEW ROUTES ---
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.route("/reviews").put(isAuthenticatedUser, createProductReview);
router.route("/admin/reviews").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);
   
export default router;


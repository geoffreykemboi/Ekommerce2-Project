import express from 'express';
import { get } from 'mongoose';
import { 
    createProductReview,
    deleteProduct, 
    deleteReview, 
    getProductDetails, 
    getProducts, newProduct, 
    updateProduct, 
} from '../controllers/productControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.route("/").get(getProducts);  
router
    .route("/admin/products")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router.route("/products/:id").get(getProductDetails); // Assuming you want to get a single product by ID

router
    .route("/products/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct); // Assuming you want to update a product by ID    
router
    .route("/products/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct); // Assuming you want to update a product by ID in admin

router
    .route("/products/:id")
    .get(isAuthenticatedUser, getProductDetails) // Assuming you want to get product reviews

   router
    .route("/reviews") 
    .put(isAuthenticatedUser,createProductReview); // Assuming you want to create a product review

router
    .route("/admin/reviews")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview); // Assuming you want to delete a product review by admin
   


export default router;


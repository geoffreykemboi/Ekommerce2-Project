import express from 'express';
const router = express.Router();

// Before
import { newOrder, getOrderDetails, myOrders ,getSales, allOrders, updateOrder, deleteOrder } from '../controllers/orderControllers.js'; // Import order controllers
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js'; // Import authentication and authorization middlewares

router.route('/order/new').post(isAuthenticatedUser, newOrder); // Fixed route path
router.route('/orders/:id').get(isAuthenticatedUser, getOrderDetails); // Added route for getting order details
router.route('/me/orders').get(isAuthenticatedUser, myOrders); // Added route for getting user's orders

router
.route("/admin/get_sales")
.get(isAuthenticatedUser, authorizeRoles("admin"), getSales); // Route for admin to get all orders


router
.route("/admin/orders")
.get(isAuthenticatedUser, authorizeRoles("admin"), allOrders); // Route for admin to get all orders

router
.route("/admin/orders/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder) // Route for admin to update order status
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder); // Route for admin to delete an order


export default router;

import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProductByID)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);
export default router;

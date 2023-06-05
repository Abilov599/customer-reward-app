import express from "express";
import { getAllProducts } from "../controllers/products.js";
const router = express.Router();

router.get("/products", getAllProducts);

export { router as ProductRoute };

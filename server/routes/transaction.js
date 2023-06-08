import express from "express";
import { transaction } from "../controllers/transactions.js";
const router = express.Router();

router.post("/purchase/:id", transaction);

export { router as TransactionRoute };

import express from "express";
import { calculatePoints } from "../controllers/transactions.js";
const router = express.Router();

router.post("/calculate-reward-points", calculatePoints);

export { router as TransactionRoute };

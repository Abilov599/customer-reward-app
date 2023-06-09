import express from "express";
import {
  calcPointsForThreeMonth,
  transaction,
} from "../controllers/transaction.js";
const router = express.Router();

router.post("/purchase", transaction);
router.post("/calcTransactions", calcPointsForThreeMonth);

export { router as TransactionRoute };

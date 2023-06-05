import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    customerId: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Transaction = model("transaction", transactionSchema);

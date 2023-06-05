import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRoute } from "./routes/user.js";
import { ProductRoute } from "./routes/products.js";
import { TransactionRoute } from "./routes/transaction.js";

const app = express();
dotenv.config();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
mongoose.set("strictQuery", false);
//Routes
app.use("/", UserRoute);
app.use("/", ProductRoute);
app.use("/", TransactionRoute);

const PORT = process.env.PORT || 8000;
const DB = process.env.DB_URL.replace("<password>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connection Succeeded."))
  .catch((err) => console.log("Error in DB connection: " + err));

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}/`));

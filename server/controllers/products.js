import { Products } from "../models/products.js";

export const getAllProducts = async (_req, res) => {
  try {
    const data = await Products.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

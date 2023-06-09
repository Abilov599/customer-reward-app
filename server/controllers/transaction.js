import { Transaction } from "../models/transaction.js";
import { Users } from "../models/user.js";

export const transaction = async (req, res) => {
  try {
    const { userId, price } = req.body;

    let totalPoints = 0;
    const pointsPerDollarOver100 = 2;
    const pointsPerDollarBetween50And100 = 1;

    // Calculate points based on the price
    if (price > 100) {
      const pointsOver100 = (price - 100) * pointsPerDollarOver100;
      const pointsBetween50And100 = 50 * pointsPerDollarBetween50And100;
      totalPoints = pointsOver100 + pointsBetween50And100;
    } else if (price > 50) {
      totalPoints = (price - 50) * pointsPerDollarBetween50And100;
    }

    let user = await Users.findById({ _id: userId });
    user.points += totalPoints;

    await user.save();

    // Create a new transaction document and save it to the database
    const newTransaction = new Transaction({
      customerId: userId,
      amount: price,
      totalPoints,
    });
    await newTransaction.save();

    res.status(200).json({ totalPoints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

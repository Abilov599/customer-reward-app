import { Transaction } from "./../models/transaction.js";

export const calculatePoints = async (req, res) => {
  try {
    const { customerId, transactions } = req.body;

    let totalPoints = 0;
    const pointsPerDollarOver100 = 2;
    const pointsPerDollarBetween50And100 = 1;

    // Iterate through each transaction
    for (const transaction of transactions) {
      const amount = transaction.amount;

      // Calculate points for each transaction based on the reward program rules
      if (amount > 100) {
        const pointsOver100 = (amount - 100) * pointsPerDollarOver100;
        const pointsBetween50And100 = 50 * pointsPerDollarBetween50And100;
        const points = pointsOver100 + pointsBetween50And100;
        totalPoints += points;
      } else if (amount > 50) {
        const pointsBetween50And100 =
          (amount - 50) * pointsPerDollarBetween50And100;
        totalPoints += pointsBetween50And100;
      }
    }

    // Create a new transaction document and save it to the database
    const newTransaction = new Transaction({
      customerId,
      amount: totalPoints,
    });
    await newTransaction.save();

    res.status(200).json({ totalPoints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

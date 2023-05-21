const express = require("express");
const router = express.Router();
const db = require("../models");
// const bcrypt = require("bcrypt");
// Replace with your database connection

const stocks = db.stock;

router.post('/data', async (req, res) => {
  try {
    // Get the data from the request body
    const newData = req.body;
    console.log(req.body);

    // Insert each data item into the "stocks" table
    await Promise.all(
      newData.map(async (data) => {
        await stocks.create({
          variant: data.variant,
          stock: data.stock
        });
      })
    );

    // Send a success response
    res.status(200).json({ message: 'Data stored successfully' });
  } catch (error) {
    // Handle any errors
    console.error('Error storing data:', error);
    res.status(500).json({ message: 'Failed to store data' });
  }
});

module.exports = router;

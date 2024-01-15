const express = require('express');
const Sale = require('../models/Sales');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
let success = false;

//Route-1: Get all the sales using: GET , Login required
router.get('/getallsales', fetchuser, async (req, res) => {
  try {
    const sales = await Sale.find({ user: req.user.id });
    res.json(sales);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
})

//Route-2: Add a new sale using: POST , Login required
router.post('/addsales', fetchuser, [
  body('productName', 'Enter a valid product name').isLength({ min: 3 }),
  body('quantity', 'Quantity can not be blank').isLength({ min: 1 }),
  body('amount', 'Amount can not be blank').isLength({ min: 1 })
], async (req, res) => {

  try {
    const { productName, quantity, amount } = req.body;
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }
    const sale = new Sale({
      productName, quantity, amount, user: req.user.id
    })
    const saveSale = await sale.save()
    success = true;
    res.json({ success, saveSale });
  } catch (error) {
    success = false;
    console.log(error.message);
    res.status(500).send(success, "Internal server error");
  }
})

module.exports = router;
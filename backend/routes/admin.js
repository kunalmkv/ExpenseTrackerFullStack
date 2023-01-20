const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/add-expense', adminController.postAddExp);
router.get('/get-expense', adminController.getExpense);
router.delete('/delete-expense/:id', adminController.deleteExpense);
module.exports = router;
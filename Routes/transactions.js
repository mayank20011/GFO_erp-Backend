import express from "express";
import { getTransactions, addTransaction, deleteTransaction } from "../controllers/transaction.js";
const router =express.Router();

router.route('/Purchase')
.get(getTransactions)
.post(addTransaction);

router.route('/:id')
.delete(deleteTransaction);

export default router;
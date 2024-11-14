import express from "express";
import { getAllPurchase, updateSpecificPurchase, deleteSpecificPurchase, savePurchase } from "../controllers/purchase.js";
const router = express.Router();

router.route("/")
.get(getAllPurchase)
.post(savePurchase);

router.route("/:id")
.patch(updateSpecificPurchase);

router.route("/:id")
.delete(deleteSpecificPurchase);

export default router;

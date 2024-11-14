import express from "express";
import { getAllSales, saveSaledata, updateSpecificSaleData, deleteSpecificSaleData} from "../controllers/sales.js";

const router = express.Router();

router.route("/")
.get(getAllSales)
.post(saveSaledata);

router.route("/:id")
.patch(updateSpecificSaleData);

router.route("/:id")
.delete(deleteSpecificSaleData);

export default router;

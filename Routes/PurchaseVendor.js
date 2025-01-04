import { Router } from "express";
import { getAllVendors, addNewVendor, replaceVendor, updateBalanceAndKeepHistory } from "../controllers/PurchaseVendor.js";

const purchaseVendorRouter= Router();

purchaseVendorRouter.route("/")
.get(getAllVendors)
.post(addNewVendor)
.put(replaceVendor);

purchaseVendorRouter.route("/history")
.post(updateBalanceAndKeepHistory);

export default purchaseVendorRouter;
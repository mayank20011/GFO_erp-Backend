import { Router } from "express";
import { getAllVendors, addNewVendor, replaceVendor, updateBalanceAndKeepHistory, getAllVendorsName } from "../controllers/PurchaseVendor.js";

const purchaseVendorRouter= Router();

purchaseVendorRouter.route("/")
.get(getAllVendors)
.post(addNewVendor)
.put(replaceVendor);

purchaseVendorRouter.route("/names")
.get(getAllVendorsName);

purchaseVendorRouter.route("/history")
.post(updateBalanceAndKeepHistory);

export default purchaseVendorRouter;
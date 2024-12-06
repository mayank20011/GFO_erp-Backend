import { Router } from "express";
import { getAllVendors } from "../controllers/PurchaseVendor.js";

const purchaseVendorRouter= Router();

purchaseVendorRouter.route("/")
.get(getAllVendors);

export default purchaseVendorRouter;
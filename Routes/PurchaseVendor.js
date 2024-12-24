import { Router } from "express";
import { getAllVendors, addNewVendor, replaceVendor } from "../controllers/PurchaseVendor.js";

const purchaseVendorRouter= Router();

purchaseVendorRouter.route("/")
.get(getAllVendors)
.post(addNewVendor)
.put(replaceVendor);

export default purchaseVendorRouter;
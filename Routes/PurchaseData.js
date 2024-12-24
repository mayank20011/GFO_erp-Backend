import { Router } from "express";
import {getPurchaseData, createObjForVendor, savePurchaseData} from "../controllers/PurchaseData.js";
const PurchaseDataRouter=Router();

PurchaseDataRouter.route("/")
.get(getPurchaseData)
.post(savePurchaseData);

PurchaseDataRouter.route("/createRecord")
.post(createObjForVendor);

export default PurchaseDataRouter;
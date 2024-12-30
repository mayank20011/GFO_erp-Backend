import { Router } from "express";
import {getPurchaseData, createObjForVendor, savePurchaseData, PurchasingClientNames} from "../controllers/PurchaseData.js";
const PurchaseDataRouter=Router();

PurchaseDataRouter.route("/")
.get(PurchasingClientNames)
.post(savePurchaseData);

PurchaseDataRouter.route("/:_id")
.get(getPurchaseData)
PurchaseDataRouter.route("/createRecord")
.post(createObjForVendor);

export default PurchaseDataRouter;
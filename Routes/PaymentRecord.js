import { Router } from "express";
import { getSpecifVendorRecord } from "../controllers/PaymentRecord.js";
const paymentRouter = Router();

paymentRouter.route("/:_id")
.get(getSpecifVendorRecord);

export default paymentRouter;
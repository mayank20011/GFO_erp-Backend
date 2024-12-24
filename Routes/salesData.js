import { Router } from "express";
import {addSalesData} from "../controllers/salesData.js";
const salesDataRouter= Router();

salesDataRouter.route("/")
.post(addSalesData);

export default salesDataRouter;
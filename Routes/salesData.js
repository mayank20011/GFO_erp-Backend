import { Router } from "express";
import {addSalesData , getClientsData} from "../controllers/salesData.js";
const salesDataRouter= Router();

salesDataRouter.route("/")
.post(addSalesData);

salesDataRouter.route("/:vendorName/:client")
.get(getClientsData);

export default salesDataRouter;
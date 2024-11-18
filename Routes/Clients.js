import express from "express";
import {addClient, getAllClients} from "../controllers/Client.js";

const clientRouter = express.Router();

clientRouter.route("/")
.post(addClient)
.get(getAllClients);

export default clientRouter;
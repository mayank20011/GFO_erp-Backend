import express from "express";
import {addClient, getAllClients, updateClient, deleteClient } from "../controllers/routeClient.js";

const RouteClientRouter = express.Router();

RouteClientRouter.route("/")
.post(addClient)
.put(updateClient);

RouteClientRouter.route("/:id")
.delete(deleteClient);

RouteClientRouter.route("/:name")
.get(getAllClients);


export default RouteClientRouter;

import express from "express";
import {matchClient, sendAllClient, addClient, deleteUser, updateClient} from "../controllers/Users.js";
const userRouter=express.Router();

userRouter.route("/")
.post(matchClient)
.get(sendAllClient)
.put(updateClient);

userRouter.route("/:id")
.delete(deleteUser);

userRouter.route("/addUser")
.post(addClient);

export default userRouter; 
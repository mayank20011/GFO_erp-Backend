import express from "express";
import {matchClient} from "../controllers/Users.js";
const userRouter=express.Router();

userRouter.route("/")
.post(matchClient);
export default userRouter; 
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path:'./config/config.env'});

console.log(process.env.MONGO_URI);
mongoose.connect(`${process.env.MONGO_URI}`).then((res)=>
  {
    console.log(`SuccessFully Connected to DB ${res}`)
  }).catch((err)=>
    {
      console.log(`DB Connection refused ${err.message}`)
    });
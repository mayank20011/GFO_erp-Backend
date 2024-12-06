import mongoose, { Schema } from "mongoose";

const authorization= new Schema({
  name:{
    type:String,
    required:[true,"Enter Name"]
  },
  password:{
    type:String,
    required:[true, "Enter Password"]
  },
  roles:{
    // array to store all access and all data will be in form of string
    type:[String],
    required:[true,"Give Atleast 1 privelage to access"],
  }
}); 

export default mongoose.model('authority',authorization);
import mongoose, { Schema } from "mongoose";

const PurchaseVendor = new Schema({
  name: {
    type: String,
    required: [true, "Enter Name of the Vendor"],
  },
  snfRate: {
    type: Number,
    required: [true, "Enter Rate of snf for purchasing"],
  },
  fatRate: {
    type: Number,
    required: [true, "Enter Rate of fat for purchasing"],
  },
  phoneNumber: {
    type: [String],
    required: [true, "Enter Atleast 1 Number"],
  },
  vechileNumber:{
    type:[String],
    required: [true, "Enter Atleast 1 Vechile Number"],
  },
  balanceAmount:{
    type:Number,
    default:0,
  }
});

export default mongoose.model("PurchaseVendor",PurchaseVendor);

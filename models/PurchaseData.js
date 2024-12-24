import mongoose, { Schema } from "mongoose";

const PurchaseData=new Schema({
    vendorName:{
      type:String,
      required:[true,'Enter Vendor Name']
    },
    purchaseRecord:[]
});

export default mongoose.model('PurchaseData',PurchaseData );


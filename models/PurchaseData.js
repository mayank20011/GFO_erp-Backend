import mongoose, { Schema } from "mongoose";

const PurchaseData=new Schema({
    vendorName:{
      type:String,
      required:[true,'Enter Vendor Name']
    },
    purchaseRecord:{
      type:{},
      required:[true, 'Enter purchase Record']
    }
});

export default mongoose.model('PurchaseData',PurchaseData );


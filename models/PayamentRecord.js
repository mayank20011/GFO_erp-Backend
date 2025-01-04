import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  Time:{
    type:{},
    required:[true, 'Enter Time'],
  },
  paymentType:{
    type:String,
    required:[true, 'Enter Purchase Type'],
  },
  paymentDetails:{
    type:{},
    required:[true, 'Enter Payment Details'],
  },
  transactionHandler:{
    type:String,
  },
  amount:{
    type:Number,
    required:[true, 'Enter Amount'],
  },
  vendorName:{
    type:String,
    required:[true, 'Enter Vendor Name to whom you are paying'],
  },
  vendor_id:{
    type:String,
    required:[true, 'Enter Vendor id'],
  },
  pendingAmount:{
    type:Number,
    required:[true, 'Enter Pending Amount'],
  },
  lastPendingAmount:{
    type:Number,
    required:[true, 'Enter Last Pending Amount']
  }
});

export default mongoose.model("PaymentDetail",paymentSchema);
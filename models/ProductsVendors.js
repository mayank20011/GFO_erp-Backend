import mongoose from "mongoose";

const ProductsVendor=new mongoose.Schema(
  {
    name:{
      type:String,
      required:[true, "Enter Name of The Vender"]
    },
    products:[{}]
  });

export default mongoose.model('ProductsVendor',ProductsVendor);

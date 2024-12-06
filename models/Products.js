import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema(
  {
    productName:{
       type:String,
       required:[true,'Enter Product Name'],
       trim:true,
    },
    quantity:{
      type:String,
      required:[true,'Enter the Product Quantity'],
      trim:true,
    }
  });

export default mongoose.model('Products',ProductSchema);
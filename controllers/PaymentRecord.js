import paymentSchema from "../models/PayamentRecord.js";

export function getSpecifVendorRecord(req,res){
  console.log(req.params._id)
   paymentSchema.find({vendor_id:req.params._id}).sort({ _id: -1 }).limit(10)
   .then((data)=>{
     if(data.length!=0 || data!=null){
       res.status(200).json({
        success:true,
        count:data.length,
        data:data,
        message:'Data Found',
       })
     }
     else{
      res.status(201).json({
        success:true,
        message:'Data not Found',
       })
     }
   })
   .catch((err)=>{
    res.status(500).json({
      success:false,
      message:'Server Error',
      err:err,
    })
   });
}

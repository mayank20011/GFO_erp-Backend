import PurchaseVendors from "../models/PurchaseVendors.js";
export function getAllVendors(req,res)
{
  PurchaseVendors.find()
  .then((response)=>
    {
       res.status(201).send(response);
    })
  .catch((err)=>
    {
      console.log(err);
    });
}
export function addNewVendor(req,res){
  PurchaseVendors.create(req.body).then((response)=>
    {
      if(response){
        res.status(201).json({
          success:true,
          data:response
        });
      }
    })
  .catch((err)=>{
    res.status(400).json({
      success:false,
      err:err,
    });
  })
}

export function replaceVendor(req, res, next) {
  console.log('fun run');
  PurchaseVendors.findOneAndReplace({ _id: req.body._id }, req.body)
    .then((response) => {
      console.log(response);
      res.status(201).json({
        success: true,
        data: response
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        err:err
      });
    });
}
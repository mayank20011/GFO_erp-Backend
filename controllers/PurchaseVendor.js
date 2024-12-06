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
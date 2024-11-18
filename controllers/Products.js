import Products from "../models/Products.js";

export function addProduct(req,res,next)
{
    Products.create(req.body)
    .then((confirmation)=>
      {
         res.status(200).json({
          success:true,
          message:`Data Saved Successfully`,
          data:confirmation,
         });
      })
    .catch((err)=>
      {
        res.status(500).json({
          success:false,
          message:`Server Error`,
        })
      });

}

export function getAllProducts(req,res,next)
{
   Products.find()
   .then((allProducts)=>
    {
      res.status(200).json(
        {
          success:true,
          count:allProducts.length,
          data:allProducts,
        });
    })
   .catch((err)=>
    {
      res.status(500).json(
        {
          success:false,
          err:`Server Error`,
        })
    });
}
import Purchase from "../models/Purchase.js";

export function getAllPurchase(req,res,next)
{
   Purchase.find()
   .then((purchaseData)=>
    {
      res.status(200).json(
        {
          success:true,
          count:purchaseData.length,
          data:purchaseData,
        })
    })
   .catch((err)=>
    {
      res.status(500).json(
        {
          success:false,
          err:`Server Problem`,
        })
    });
}

export function savePurchase(req,res,next)
{
   Purchase.create(req.body)
   .then((dataReturned)=>
    {
      res.status(201).json( {
        success:true,
        mesage:'Resource Created Successfully',
        data:dataReturned
      })
    }
    )
   .catch((err)=>
    {
      console.log(err);
      if(err.name==='ValidationError')
        {
          const errorMessageArray=[];
          const keys=Object.keys(err.errors);
          for(let key of keys)
            {
              errorMessageArray.push(err.errors[`${key}`].message)
            }
           res.status(400).json({
            success:false,
            error:errorMessageArray,
           });
        }
        else
        {
           res.status(500).json(
            {
              success:false,
              message:'Server Error',
            }
           )
        }
    });
}
export function updateSpecificPurchase(req,res,next)
{
  console.log('updateSpecificPurchase');
}
export function deleteSpecificPurchase(req,res,next)
{
  console.log('deleteSpecificPurchase');
}
import Sales from "../models/Sales.js";

export function getAllSales(req,res,next)
{
     Sales.find().then((salesData)=>
      {
        console.log(salesData);
         res.status(200).json(
          {
             success:true,
             count:salesData.length,
             data:salesData
          })
      }).catch((err)=>
        {
          res.status(500).json({
            success:false,
            err:'Server error',
          });
        })
}

export function saveSaledata(req,res,next)
{
  Sales.create(req.body)
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

export function updateSpecificSaleData(req,res,next)
{
  console.log('updateSpecificSaleData');
}

export function deleteSpecificSaleData(req,res,next)
{
  console.log('deleteSpecificSaleData');
}
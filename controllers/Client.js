import Clients from "../models/Clients.js";

export function addClient(req, res, next) {
  Clients.create(req.body)
    .then((dataReturned) => {
      res.status(200).json({
        success: true,
        message: "Client Created Successfully",
        data: dataReturned,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        const errorMessageArray = [];
        const keys = Object.keys(err.errors);
        for (let key of keys) {
          errorMessageArray.push(err.errors[`${key}`].message);
        }
        res.status(400).json({
          success: false,
          error: errorMessageArray,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
    });
}

export function getAllClients(req,res,next)
{
   Clients.find()
   .then(allCLient=>{
    res.status(200).json({
      success:true,
      count:allCLient.length,
      data:allCLient,
    })
   })
   .catch((err)=>
    {
      console.log(err);
      res.json({
        success:false,
        err:`Server Error`,
      })
    }) 
}




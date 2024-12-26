import salesData from "../models/salesData.js";
export function addSalesData(req, res) {
  console.log(req.body);
  salesData.create(req.body)
  .then((data)=>{
    if(data){
      res.status(201).json({
        success: true,
        message:'Created Successfully',
      });
    }
    else{
      res.status(422).json({
        success:false,
        message:'Resource Cannot be created',
      })
    }
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).json({
      success:false,
      err:err,
      message:'Server Issue',
    });
  });
  
}

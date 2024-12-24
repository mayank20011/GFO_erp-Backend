import PurchaseData from "../models/PurchaseData.js";

export function getPurchaseData(req, res) {

}

export function savePurchaseData(req, res) {
  console.log(req.body);
  PurchaseData.findOne({ vendorName: req.body.vendorName })
    .then((data) => {
      if (data == null) {
        res.status(404).json({
          success: false,
          err: `No Such Vendor In DB`,
        });
      } else {
        const dataToPush = req.body;
        delete dataToPush.vendorName;
        data.purchaseRecord.push(dataToPush);
        console.log(data.purchaseRecord);
        data
          .save()
          .then(() => {
            res.status(201).json({
              success: true,
            });
          })
          .catch(() => {
            res.status(201).json({
              success: true,
              err: `Cant Save to db`,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err: err,
      });
    });
}

export function createObjForVendor(req, res, next)
{
  console.log(req.body);
  PurchaseData.create(req.body)
  .then((data)=>{
    if(data){
       res.status(201).json({
        success:true,
       });
    }
    else{
       res.status(404).json({
         success:false,
         err:'Cant Save in Db'
       });
    }
  })
  .catch((err)=>{
    res.status(500).json({
      success:false,
      err:err,
    })
  });
}
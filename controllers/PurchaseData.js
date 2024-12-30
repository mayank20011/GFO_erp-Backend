import PurchaseData from "../models/PurchaseData.js";

export function PurchasingClientNames(req, res) {
  PurchaseData.find()
    .select("vendorName _id")
    .then((data) => {
      res.status(201).json({
        success: true,
        message: "Data Found",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err: err,
        message: `Server Problem`,
      });
    });
}

export function getPurchaseData(req, res) {
  PurchaseData.findById(req.params._id)
    .then((data) => {
      if (data) {
        res.status(201).json({
          success: true,
          data: data.purchaseRecord,
          message: "Data Found",
        });
      } else {
        res.status(202).json({
          success: false,
          message: "Data Not Found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server Problem",
      });
    });
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

export function createObjForVendor(req, res, next) {
  console.log(req.body);
  PurchaseData.create(req.body)
    .then((data) => {
      if (data) {
        res.status(201).json({
          success: true,
        });
      } else {
        res.status(404).json({
          success: false,
          err: "Cant Save in Db",
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

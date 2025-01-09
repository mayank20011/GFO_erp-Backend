import PurchaseData from "../models/PurchaseData.js";
import PurchaseVendors from "../models/PurchaseVendors.js";
import mongoose from "mongoose";
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
  console.log("req Hit");
  PurchaseData.find({ vendorName: req.params.name })
    .then((data) => {
      if (data) {
        console.log(data);
        res.status(201).json({
          success: true,
          data: data,
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
  const vendorName = req.body.vendorName;
  const purchaseRecord = req.body;
  delete purchaseRecord.vendorName;

  const session = mongoose.startSession();

  session
    .then((session) => {
      session.startTransaction();

      return PurchaseData.create(
        [
          {
            vendorName: vendorName,
            purchaseRecord: purchaseRecord,
          },
        ],
        { session }
      )
        .then(() => {
          return PurchaseVendors.findById(req.body.id, null, { session });
        })
        .then((vendor) => {
          if (!vendor) {
            throw new Error("Vendor not found");
          }

          vendor.balanceAmount += req.body.money;
          return vendor.save({ session });
        })
        .then(() => {
          return session.commitTransaction();
        })
        .then(() => {
          session.endSession();
          res.status(200).json({
            message: "Transaction successful",
            success: true,
          });
        })
        .catch((error) => {
          return session.abortTransaction().then(() => {
            session.endSession();
            res.status(500).json({
              message: "Transaction failed",
              success: false,
              error: error.message,
            });
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err.message,
        message: "Server Problem",
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

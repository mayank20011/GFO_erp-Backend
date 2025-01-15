import PurchaseData from "../models/PurchaseData.js";
import PurchaseVendors from "../models/PurchaseVendors.js";
import mongoose from "mongoose";
import PayamentRecord from "../models/PayamentRecord.js";

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
  PurchaseData.find({ vendorName: req.params.name }).sort({_id:-1})
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

// export function savePurchaseData(req, res) {

//   let toPushInLedger = null;
//   if (req.body.passedOrFailed !== "Failled") {
//     toPushInLedger = {
//       Time: req.body.dateAndTime,
//       paymentType: "Purchase",
//       paymentDetails: {
//         cash: {
//           amount: "",
//         },
//         upi: {
//           amount: "",
//           refNo: "",
//         },
//         others: {
//           amount: "",
//           refNo: "",
//         },
//       },
//       transactionHandler: "",
//       amount: parseFloat(req.body.money), // Make sure the amount is a number
//       vendorName: req.body.vendorName,
//       vendor_id: req.body.id,
//       pendingAmount:
//         parseFloat(req.body.balanceAmount) + parseFloat(req.body.money),
//       lastPendingAmount: parseFloat(req.body.balanceAmount),
//     };
//     console.log(toPushInLedger);
//   }
  
//   const vendorName = req.body.vendorName;
//   const purchaseRecord = req.body;
//   delete purchaseRecord.vendorName;

//   mongoose
//     .startSession()
//     .then((session) => {
//       session.startTransaction();

//       return PurchaseData.create(
//         [
//           {
//             vendorName: vendorName,
//             purchaseRecord: purchaseRecord,
//           },
//         ],
//         { session }
//       )
//         .then(() => {
//           return PurchaseVendors.findById(req.body.id, null, { session });
//         })
//         .then((vendor) => {
//           if (!vendor) {
//             throw new Error("Vendor not found");
//           }
//           vendor.balanceAmount += parseFloat(req.body.money);
//           return vendor.save({ session });
//         })
//         .then(() => {
//           if (toPushInLedger) {
//             return PayamentRecord.create([toPushInLedger], { session });
//           }
//         })
//         .then(() => {
//           return session.commitTransaction();
//         })
//         .then(() => {
//           session.endSession();
//           res.status(200).json({
//             message: "Transaction successful",
//             success: true,
//           });
//         })
//         .catch((error) => {
//           return session.abortTransaction().then(() => {
//             console.log(error);
//             session.endSession();
//             res.status(500).json({
//               message: "Transaction failed",
//               success: false,
//               error: error.message,
//             });
//           });
//         });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         error: err.message,
//         message: "Server Problem",
//       });
//     });
// }

export function savePurchaseData(req, res) {
  const money = req.body.money ?parseFloat(req.body.money) : 0;
  const balanceAmount = parseFloat(req.body.balanceAmount);

  console.log(money,  balanceAmount);

  if (isNaN(money) || isNaN(balanceAmount)) {
      return res.status(400).json({
          message: "Invalid input: money or balanceAmount is not a number",
          success: false,
      });
  }

  let toPushInLedger = null;
  if (req.body.passedOrFailed !== "Failled") {
      toPushInLedger = {
          Time: req.body.dateAndTime,
          paymentType: "Purchase",
          paymentDetails: {
              cash: { amount: "" },
              upi: { amount: "", refNo: "" },
              others: { amount: "", refNo: "" },
          },
          transactionHandler: "",
          amount: money,
          vendorName: req.body.vendorName,
          vendor_id: req.body.id,
          pendingAmount: balanceAmount + money,
          lastPendingAmount: balanceAmount,
      };
  }

  const vendorName = req.body.vendorName;
  const purchaseRecord = req.body;
  delete purchaseRecord.vendorName;

  mongoose
      .startSession()
      .then((session) => {
          session.startTransaction();

          return PurchaseData.create(
              [{ vendorName: vendorName, purchaseRecord: purchaseRecord }],
              { session }
          )
              .then(() => PurchaseVendors.findById(req.body.id, null, { session }))
              .then((vendor) => {
                  if (!vendor) {
                      throw new Error("Vendor not found");
                  }
                  vendor.balanceAmount += money;
                  return vendor.save({ session });
              })
              .then(() => {
                  if (toPushInLedger) {
                      return PayamentRecord.create([toPushInLedger], { session });
                  }
              })
              .then(() => session.commitTransaction())
              .then(() => {
                  session.endSession();
                  res.status(200).json({ message: "Transaction successful", success: true });
              })
              .catch((error) => {
                  return session.abortTransaction().then(() => {
                      console.log(error);
                      session.endSession();
                      res.status(500).json({ message: "Transaction failed", success: false, error: error.message });
                  });
              });
      })
      .catch((err) => {
          res.status(500).json({ success: false, error: err.message, message: "Server Problem" });
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

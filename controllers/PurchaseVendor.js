import PurchaseVendors from "../models/PurchaseVendors.js";
import paymentSchema from "../models/PayamentRecord.js";
import { startSessionAndTransaction } from "../config/db.js";
import PurchaseData from "../models/PurchaseData.js";

export function getAllVendors(req, res) {
  PurchaseVendors.find()
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getAllVendorsName(req, res) {
  PurchaseVendors.find({}, 'name')
    .then((data) => {
      console.log(data);
      if (data.length === 0) {
        res.status(500).json({
          success: false,
          message: "No Users in Db",
        });
      } else {
        res.status(201).json({
          success: true,
          data: data,
          message: "Data Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err: err,
        message: "Server Problem",
      });
    });
}

export function replaceVendor(req, res, next) {
  console.log("fun run");
  PurchaseVendors.findOneAndReplace({ _id: req.body._id }, req.body)
    .then((response) => {
      console.log(response);
      res.status(201).json({
        success: true,
        data: response,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        err: err,
      });
    });
}

export function addNewVendor(req, res) {

  PurchaseVendors.create(req.body)
  .then((data)=>{
    if(data){
      res.status(201).json({
        success:true,
        message:'Created Successfully',
        data:data,
      })
    }
    else{
      res.status(500).json({
        success:false,
        message:'Data Not Found',
      })
    }
  })
  .catch((err)=>{
    res.status(500).json({
      success:false,
      err:err,
      message:'Server Problem',
    })
  })
}

export function updateBalanceAndKeepHistory(req, res) {
  const { update, record } = req.body;
  const runTransactionExample = () => {
    return startSessionAndTransaction((session) => {
      return paymentSchema
        .create([record], { session }) // Wrap record in an array
        .then(() =>
          PurchaseVendors.findByIdAndUpdate(
            update._id,
            { balanceAmount: update.balanceAmount },
            { new: true, session } // Include session in options
          )
        );
    });
  };

  runTransactionExample()
    .then(() => {
      // Transaction committed, send a success response
      res.status(200).json({
        message: "Transaction successful",
        success: true,
        data: { update, record },
      });
    })
    .catch((error) => {
      // Transaction aborted or an error occurred, send an error response
      res.status(500).json({
        message: "Transaction failed",
        success: false,
        error: error.message,
      });
    });
}

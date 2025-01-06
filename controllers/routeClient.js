import RouteClients from "../models/routeClient.js";
import paymentSchema from "../models/PayamentRecord.js";
import { startSessionAndTransaction } from "../config/db.js";

export function addClient(req, res) {
  console.log(req.body);
  RouteClients.findOne({clientName:req.body.clientName , vendorName:req.body.vendorName})
    .then((dataReturned) => {
      console.log(dataReturned);
      if (dataReturned) {
        res.status(200).json({
          success: false,
          message: "Already a client With Same Name",
        });
      } else {
        RouteClients.create(req.body)
          .then((data) => {
            res.status(201).json({
              success: true,
            });
          })
          .catch((err) => {
            res.status(201).json({
              success: false,
              err: "Can't Create Data",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        err: "Server Problem",
      });
    });
}

// will return the all client names of a specific vendor
export function getAllClients(req, res) {
  RouteClients.find({ vendorName: req.params.name })
    .then((data) => {
      if (data.length != 0) {
        data = data.map((item) => ({
          name: item.clientName,
          _id: item._id,
          balanceAmount:item.balanceAmount
        }));
        res.status(200).json({
          success: true,
          data: data,
        });
      } else {
        res.status(201).json({
          success: false,
          err: err,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        err: err,
      });
    });
}

export function updateClient(req, res) {
  RouteClients.findByIdAndUpdate(req.body._id)
    .then((data) => {
      data.clientName = req.body.clientName;
      data.balanceAmount=req.body.balanceAmount;
      data
        .save()
        .then(() => {
          res.status(201).json({
            success: true,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Cant Save In Db",
            err: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
      });
    });
}

export function deleteClient(req, res) {
  console.log(req.params.id);
  RouteClients.findByIdAndDelete(req.params.id)
  .then((data)=>{
    if(data){
      res.status(202).json({
        success:true,
      })
    }
    else{
      res.status(404).json({
        success:false,
        message:'Cant Find User With this id',
      });
    }
  })
  .catch((err)=>{
    res.status(500).json({
      success:true,
      message:'Server Problem',
      err:err
    })
  })
}

export function updateBalanceAndKeepHistory(req, res) {
  const { update, record } = req.body;
  const runTransactionExample = () => {
    return startSessionAndTransaction((session) => {
      return paymentSchema
        .create([record], { session })  // Wrap record in an array
        .then(() =>
          RouteClients.findByIdAndUpdate(
            update._id,
            { balanceAmount: update.balanceAmount },
            { new: true, session }  // Include session in options
          )
        );
    });
  };

  runTransactionExample()
    .then(() => {
      // Transaction committed, send a success response
      res.status(200).json({ message: "Transaction successful", success: true, data: { update, record } });
    })
    .catch((error) => {
      // Transaction aborted or an error occurred, send an error response
      res.status(500).json({ message: "Transaction failed", success: false, error: error.message });
    });
}
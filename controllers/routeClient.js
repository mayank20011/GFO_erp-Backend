import RouteClients from "../models/routeClient.js";

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

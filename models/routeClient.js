import mongoose from "mongoose";

const RouteClientSchema = new mongoose.Schema({
  vendorName:{
    type: String,
    trim: true,
    required: [true, "Add Client Name"],
  },
  clientName: {
    type: String,
    trim: true,
    required: [true, "Add Client Name"],
  },
  balanceAmount:{
    type:Number,
  }
});

export default mongoose.model("routeClients", RouteClientSchema);


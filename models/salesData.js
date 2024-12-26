import mongoose, { Schema } from "mongoose";

const SalesDataSchema = new Schema({
  vendorName: {
    type: String,
    required: [true, "Enter Vendor Name"],
  },
  client: {
    type: String,
    required: [true, "Enter Client Name"],
  },
  productsSold: {
    type: [],
    required: [true, "Enter Atleast 1 Product That You are selling"],
  },
  time: {
    type: {},
    required: [true, "Enter Time of sale"],
  },
});

export default mongoose.model("salesData", SalesDataSchema);

import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    trim: true,
    required: [true, "Add Client Name"],
  },
});

export default mongoose.model("Clients", ClientSchema);

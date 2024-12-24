import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Add Client Name"],
  },
  ammount:{
    type:Number,
    default:0,
  },
  address:{
    type:String,
    trim:true,
    required: [true, "Enter Address of the Client"]
  },
  email:{
    type:[String],
    trim:true,
    required:[true, "Enter Atleast 1 email of the Client"]
  },
  contactNumber:{
    type:[Number],
    required:[true, "Enter Atleast 1 Contact Number"]
  },
  discount:{
    type:[{}],
  },
  offer:{
     type:[{}],
  },
});

export default mongoose.model("Clients", ClientSchema);

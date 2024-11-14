import mongoose from "mongoose";

const quantitySchema = new mongoose.Schema({
  "Full Cream (500 ml)": {
    type: Number,
    default: 0,
  },
  "Full Cream (400 ml)": {
    type: Number,
    default: 0,
  },
  "TONED Milk (500ML)": { 
    type: Number, default: 0 
  },
  "TONED Milk (400 ml)": { 
    type: Number, default: 0 
  },
  "DTM (500 ml)": { 
    type: Number, default: 0 
  },
  "DTM (400 ml)": { 
    type: Number, default: 0 
  },
  "DTM Bacha(170 ml)": { 
    type: Number, default: 0 
  },
  "Family Pack (450 ml)": { 
    type: Number, default: 0 
  },
  "Cow Milk (500 ml)": { 
    type: Number, default: 0 
  },
  "Cow Milk (350 ml)": { 
    type: Number, default: 0 
  },
  "Buffalo Milk (1 L)": { 
    type: Number, default: 0 
  },
  "Buffalo Milk (500 ml)": { 
    type: Number, default: 0 
  },
  "Dahi Lite (400 gm)": { 
    type: Number, default: 0 
  },
  "Dahi lite (160 gm)": { 
    type: Number, default: 0 
  },
  "plain Chach (300 ml)": { 
    type: Number, default: 0 
  },
  "Masala Chach (300 ml)": { 
    type: Number, default: 0 
  },
});

const SalesSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, "Fill the Client Name Field"],
  },
  dateOfOrder: {
    type: String,
    required: [true, "Enter Date of Order"],
  },
  dateOfDispatchAndTime: {
    type: String,
    required: [true, "Enter Date and Time of Dispatch"],
  },
  Quantity: {
    type:quantitySchema,
    required:[true, 'Enter Atleast Quantity of One Product'],
  },
});

export default mongoose.model('Sales', SalesSchema);

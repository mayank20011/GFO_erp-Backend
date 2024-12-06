import express from "express";
import dotenv from "dotenv";
import clientRouter from "./Routes/Clients.js";
import salesRouter from "./Routes/Sales.js";
import purchaseRouter from "./Routes/Purchase.js";
import ProductRouter from "./Routes/Products.js";
import userRouter from "./Routes/Users.js";
import './config/db.js';
import cors from "cors";
import purchaseVendorRouter from "./Routes/PurchaseVendor.js";

// where to look config file
dotenv.config({path: './config/config.env'});

// Accessing port from the config File
const PORT=process.env.PORT || 5000;


// initializing server
const server=express();


// Allowing origins using cors
server.use(cors({
  origin:'http://localhost:5173',
  methods:['GET','POST','PUT','PATCH','DELETE'],
  allowedHeaders:['Content-Type','Authorization']
}));


// applying middleware
server.use(express.json());
server.use('/GFOERP/Sales',salesRouter);
server.use('/GFOERP/Purchase',purchaseRouter);
server.use('/GFOERP/Client',clientRouter);
server.use('/GFOERP/Products',ProductRouter);
server.use('/GFOERP/UserLogin',userRouter);
server.use('/GFOERP/PurchaseVendors',purchaseVendorRouter);
server.listen(PORT,()=>
  {
    console.log(`Server running on port ${PORT}`);
  })   
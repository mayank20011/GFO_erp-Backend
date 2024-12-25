import express from "express";
import dotenv from "dotenv";
import clientRouter from "./Routes/Clients.js";
import ProductsVendorsRouter from "./Routes/ProductsVendors.js";
import userRouter from "./Routes/Users.js";
import './config/db.js';
import cors from "cors";
import purchaseVendorRouter from "./Routes/PurchaseVendor.js";
import PurchaseDataRouter from "./Routes/PurchaseData.js";
import salesDataRouter from "./Routes/salesData.js";
import RouteClientRouter from "./Routes/routeClient.js";

// where to look config file
dotenv.config({path: './config/config.env'});

// Accessing port from the config File
const PORT=process.env.PORT || 5000;

// initializing server
const server=express();

// Allowing origins using cors

// server.use(cors({
//   origin:['http://localhost:5173','http://localhost:5174'],
//   methods:['GET','POST','PUT','PATCH','DELETE'],
//   allowedHeaders:['Content-Type','Authorization']
// }));

server.use(cors());

// applying middleware
server.use(express.json());

// Routes ie:- also middleware

// For Clients Who are going to purchase from us
server.use('/GFOERP/Client',clientRouter);
// For Products Vendor and theit products
server.use('/GFOERP/ProductsVendors',ProductsVendorsRouter);
// For User Verifications
server.use('/GFOERP/UserLogin',userRouter);
// From Whom We are going to purchase
server.use('/GFOERP/PurchaseVendors',purchaseVendorRouter);
//  for purchase Data
server.use('/GFOERP/PurchaseData',PurchaseDataRouter);
// for sales Data
server.use('/GFOERP/SalesData',salesDataRouter);
// for Route Clients Names
server.use('/GFOERP/RouteClient',RouteClientRouter);

console.log("Hello")

server.get("/",(req,res)=>{
   res.json("Hello");
});

server.listen(PORT,()=>
  {
    console.log(`${PORT}`)
    console.log(`Server running on port ${PORT}`);
  })   
import express from "express";
import {getAllProductsVendors, addProduct ,addVendor, deleteProduct, updateProduct, vendorNames } from "../controllers/ProductsVendors.js";

const ProductsVendorsRouter = express.Router();

ProductsVendorsRouter.route("/")
.get(getAllProductsVendors)
.post(addProduct)
.put(updateProduct);

ProductsVendorsRouter.route("/:id/:HSN")
.delete(deleteProduct);

ProductsVendorsRouter.route("/addVendor")
.post(addVendor)

ProductsVendorsRouter.route("/vendorNames")
.get(vendorNames);
export default ProductsVendorsRouter;

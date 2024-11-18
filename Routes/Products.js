import express from "express";
import {getAllProducts, addProduct} from "../controllers/Products.js";

const ProductRouter = express.Router();

ProductRouter.route("/")
.get(getAllProducts)
.post(addProduct);

export default ProductRouter;

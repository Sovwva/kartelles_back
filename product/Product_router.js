import express from "express";
import Product from "./product.js";
import Product_controller from "./product_controller.js";

const product_router = express.Router();

product_router.post("/create", Product_controller.createProduct);
product_router.delete("/delete/:id", Product_controller.deleteProduct);
product_router.put("/update/:id", Product_controller.updateProduct);
product_router.get("/:ownerId", Product_controller.getAllProducts);
product_router.get("/search/:name", Product_controller.searchProductsByTitle);
product_router.post('/add-to-cart/:id', Product_controller.addToCart)
product_router.get("/cart/:cartOwner", Product_controller.getProductsInCart);
product_router.get("/owner/:ownerId", Product_controller.getProductsByOwner);


export default product_router;
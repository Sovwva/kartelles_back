import Product from "./product.js";
import mongoose from "mongoose";

class Product_controller {
    static async createProduct(req, res) {
        try {
            const { name, price, ownerId, description } = req.body;
            const product = await Product.create({
                name,
                price,
                ownerId,
                description,
            });
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const { ownerId } = req.body;

            // Проверяем наличие идентификатора продукта и идентификатора владельца
            if (!id || !ownerId) {
                return res.status(400).json({ error: "Missing product ID or owner ID" });
            }

            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            // Проверяем, что идентификатор владельца соответствует владельцу товара
            if (product.ownerId.toString() !== ownerId) {
                return res.status(401).json({ error: "Unauthorized: Owner ID does not match" });
            }

            const deletedProduct = await Product.findByIdAndDelete(id);
            res.json(deletedProduct);
        } catch (error) {
            res.status(500).json({ error: "Failed to delete product" });
        }
    }

    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { ownerId, description } = req.body;

            const product = await Product.findById(id);

            if (!product) {
                throw new Error("Product not found");
            }

            // Проверяем, является ли переданный ownerId владельцем продукта
            if (product.ownerId.toString() !== ownerId) {
                throw new Error("Unauthorized");
            }

            product.description = description;
            const updatedProduct = await product.save();

            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getProductsByOwner(req, res) {
        try {
            const { ownerId } = req.params;
            const products = await Product.find({ ownerId: (ownerId) }).lean();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: "Failed to get products by owner" });
        }
    }

    static async getProductsInCart(req, res) {
        try {
            console.log(req.params)
            const { cartOwner } = req.params;
            console.log(cartOwner)
            const products = await Product.find({ cartOwner: (cartOwner)}).lean();
            console.log(products);
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: "Failed to get products in cart" });
        }
    }



    static async getAllProducts (req, res){
    const { ownerId } = req.params;
    console.log(ownerId)
    try {
        const products = await Product.find({ ownerId: { $ne: ownerId }, isInCart: false });
        res.json(products);
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the products.' });
    }
};

    static async addToCart(req, res) {
        try {
            const { userId } = req.body;
            const { id } = req.params;
            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            if (product.isInCart) {
                return res.status(400).json({ error: "Product is already in the cart" });
            }

            product.isInCart = true;
            product.cartOwner = userId;

            await product.save();

            res.json(product);
        } catch (error) {
            res.status(500).json({ error: "Failed to add product to cart" });
        }
    }

    static async searchProductsByTitle(req, res) {
        try {
            const { name } = req.params;
            const products = await Product.find({
                name: { $regex: name, $options: "i" },
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: "Failed to search products" });
        }
    }
}

export default Product_controller;

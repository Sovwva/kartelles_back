import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import User_router from "./user/User_router.js"
import product_router from "./product/Product_router.js";

const app = express()
const PORT = 5000;
const DB_URL = "mongodb+srv://sovwva7:DBapi@kartelles.lewqqzn.mongodb.net/?retryWrites=true&w=majority"

app.use(cors());
app.use(express.json())

const checkout = require('./routes/checkout');
app.use('/checkout', checkout);

app.use('/user', User_router)
app.use('/product', product_router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log("listenig... " + PORT))
    }
    catch (e) {
        console.log(e)
    }
}

startApp()
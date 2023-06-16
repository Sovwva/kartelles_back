// Модель продукта (product.js)
import mongoose from 'mongoose';

const Product = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },

    description: { type: String },
    isInCart: { type: Boolean, default: false },
    cartOwner: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'User' },
});

export default mongoose.model('Product', Product);

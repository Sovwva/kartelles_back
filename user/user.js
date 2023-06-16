import mongoose from "mongoose";

const User = new mongoose.Schema ({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token: {type: String}
})

export default mongoose.model('User', User)
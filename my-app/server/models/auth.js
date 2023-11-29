import { model,Schema,ObjectId } from "mongoose";
import mongoose from 'mongoose';
const schema = new Schema({
    //
    username:{
        type: String,
        trim: true,
        unique: true,
        require: true,
        lowercase: true,
    },
    name:{
        type: String,
        trim: true,
        default: "",
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        require: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        maxlength: 255,
    },
    address: { type: String, default: ""},
    phone: { type: String, default: ""}, 
    photo: {},
    role: {
        type: [String],
        default: ["Buyer"],
        enum: ["Buyer", "Seller","Admin"],
    },
    enquiredProperties: [{ type: ObjectId, ref: "Ad"}],
    wishlist: [{ type: ObjectId, ref: "Ad"}],
    resetCode: {},
},
    {timestamps: true}
);
const User = mongoose.model('User', schema);
export default User;
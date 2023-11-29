// import { model,Schema,ObjectId } from "mongoose";

// const adSchema = new Schema({
//     //
//     photos: [{}],
//     price:{
//         type: Number,
//         trim: true,
//         unique: true,
//         require: true,
//     },
//     name:{
//         type: Number,
//         trim: true,
//         unique: true,
//         require: true,
//     },
//     store:{
//         type: Number,
//         trim: true,
//         default: "",
//     },
//     author:{
//         type: String,
//         trim: true,
//         unique: true,
//         require: true,
//         lowercase: true,
//     },
//     description:{
//         type: String,
//         trim: true,
//         unique: true,
//         require: true,
//         lowercase: true,
//     },
//     language:{
//         type: String,
//         trim: true,
//         unique: true,
//         require: true,
//         lowercase: true,
//     },
//     company:{
//         type: String,
//         trim: true,
//         unique: true,
//         require: true,
//         lowercase: true,
//     },
//     action: {
//         type: String,
//         default: "Sell",
//       },
//     slug: {
//       type: String,
//       lowercase: true,
//       unique: true,
//     },
//     postedBy: { type: ObjectId, ref: "User" },
    
//     wishlist: [{ type: ObjectId, ref: "Ad"}],
   
// },
//     {timestamps: true}
// );
// export default model("Ad", adSchema)

import mongoose from 'mongoose';
// import User from '../models/auth';
const CourseSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
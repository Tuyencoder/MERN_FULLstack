import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  size: Number,
  mimetype: String,
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;
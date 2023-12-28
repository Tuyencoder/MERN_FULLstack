import express from 'express';
import multer from 'multer';
import path from 'path';
import Course from '../models/ad.js';
import Image from '../models/Image.js';
import User from '../models/auth.js'
import * as course from '../controllers/ad.js';
import { requireSignin } from '../middlewares/auth.js';
const router = express.Router();



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

router.post('/create-course', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No image file uploaded.');
    }

    const {userID, name, description, price,linkCourse } = req.body;

    const { filename, originalname, path, size, mimetype } = req.file;
    const image = new Image({
      filename,
      originalname,
      path,
      size,
      mimetype,
    });
    await image.save();

    const course = new Course({
      name,
      description,
      price,
      image: image._id,
      postedBy: userID,
      linkCourse
    });
    await course.save();

    
    res.send('Course created and linked with image.');
  } catch (error) {
    console.error('Error creating Course:', error);
    res.status(500).send('Server error');
  }
});

router.get('/getAllCourse',course.getAllCourse )

router.get('/detail/:idCourse',course.getDetailCourse)

router.get('/getAllCourseById',requireSignin,course.getAllCourseById)

router.delete('/deleteCourse/:idCourse',course.deleteCourse)

router.put('/edit/:idCourse',multer().none(),course.editCourse)
export default router;
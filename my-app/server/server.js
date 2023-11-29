import express from "express";
import morgan from "morgan";
import cors from "cors";
import {Database} from "./config.js"
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import adRoutes from "./routes/ad.js"
import cartRoute from "./routes/cart.js"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//
// app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/image/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(path.join(__dirname, `public/image/${imageName}`));
  });
//connect db
mongoose.connect(Database)
.then(()=>console.log('connect db successfully'))
.catch(err=>console.log(err))

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


//route 
app.use('/api',authRoutes)
app.use("/api", adRoutes);
app.use("/api", cartRoute);
// app.use("/api", adRoutes);


app.listen(8000,() =>console.log('listening on port: 8000'));
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(cors());
app.use(express());

if (process.env.NODE_ENV = 'production'){
    async function connectMongoose() {
        try {
            const mongoose = await mongoose.connect(process.env.MONGI_URLI);
            console.log("Mongo DB connected");
            return mongoose;
            
        } catch (error) {
            console.log(error)
            return error;
        }
    }
}



//health check
app.get("/api/health", (req, res)=>{
    res.json({status: "Oks", uptime: process.uptime()});
});

const port = process.env.PORT || 5000
app.listen(port, ()=> console.log("backend running on", port));
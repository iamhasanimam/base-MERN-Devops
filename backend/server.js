import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express());

mongoose.connect(process.env.MONGO_URI)
.then(() => {console.log('MongoDB connected')})
.catch((err) => { console.log("MongoDB Error",err)})

// halth check

app.get("/api/health", (req, res)=>{
    res.json({status: "Oks", uptime: process.uptime()});
});

const port = process.env.PORT || 500
app.listen(port, ()=> console.log("backend running on", port));
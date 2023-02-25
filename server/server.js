import app from "./app.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const DB = process.env.DATABASE
const port = process.env.port || 3000

mongoose.set('strictQuery', true)

mongoose.connect(DB).then(()=>{
  app.listen(port, (req, res)=>{ console.log(`Server Connected \nPORT: ${port}`);})
})
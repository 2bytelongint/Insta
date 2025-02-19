import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import apiRoutes from './routes/index.js';

dotenv.config()


const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended : true
}));
const corsOption = {
    origin : "http://localhost:5173",
    credentials : true
}

app.use(cors(corsOption));
app.use('/api', apiRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    connectDB();
    
})
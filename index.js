import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import apiRoutes from './routes/index.js';
import passport from 'passport';
import { passportAuth } from './config/jwt-middleware.js';
import PostRepository from './repo/post-repo.js';


const app = express();
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(passport.initialize());
passportAuth(passport);

app.use('/api/user', apiRoutes)

const PORT = process.env.PORT
app.listen(PORT, async()=> {
    console.log(`Server is running at ${PORT}`)
    connectDB();
    
    const postRepo = new PostRepository();
    const post = await postRepo.getAll();

    
})
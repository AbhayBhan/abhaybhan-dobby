import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import {dbConnect} from './server/config/db.js';
import userRoutes from './server/routes/userRoutes.js';
import imageRoutes from './server/routes/imageRoutes.js';
import {errorHandler} from './server/middlewares/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/img', imageRoutes);
app.use(errorHandler);

const __dirname = path.resolve();

if(process.env.NODE_ENV === "Production"){
    app.use(express.static(path.join(__dirname,'./client/dist')));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,"client","dist","index.html"));
    })
}else{
    app.get('/', (req,res) => {
        res.send('Running');
    })
}

dbConnect();

app.listen(process.env.NODE_PORT, () => {
    console.log(`Server Functional on Port ${process.env.NODE_PORT}`);
})
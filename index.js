import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
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

dbConnect();

app.listen(process.env.NODE_PORT, () => {
    console.log(`Server Functional on Port ${process.env.NODE_PORT}`);
})
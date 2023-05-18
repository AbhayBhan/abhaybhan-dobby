import express from 'express';
import { uploadImage,getImages } from '../controller/imageController.js';
const router = express.Router();

router.post('/', uploadImage);
router.post('/getImages', getImages);

export default router;
import express from 'express';
import { register, signin } from '../../controllers/user-controller.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();


router.post('/signup', upload.single('image'), register);
router.post('/signin', signin);

export default router;
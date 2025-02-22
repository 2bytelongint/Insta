import express from 'express';
import { follow, getOthersProfile, getProfile, register, signin } from '../../controllers/user-controller.js';
import multer from 'multer';
import { authenticate } from '../../middlewares/authenticate.js';
import { createPost } from '../../controllers/post-controller.js';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();


router.post('/signup', upload.single('image'), register);
router.post('/signin', signin);
router.get('/get', authenticate, getProfile);

router.get('/getProfile', authenticate, getOthersProfile);
router.post('/followOrunfollow/:id', authenticate, follow);


router.post('/create', authenticate,upload.single("image"), createPost)
export default router;
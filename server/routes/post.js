import express from 'express';
import { createPost, getAllPost } from '../controllers/post.js';

const router = express.Router();

router.get('/', getAllPost)
router.post('/', createPost)

export default router;
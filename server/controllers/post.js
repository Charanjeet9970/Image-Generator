import Post from '../model/post.js';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const getAllPost = async (req, res,next) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data : posts });
    } catch (error) {
        console.log("Failed to fetch posts",error);
    }

}

export const createPost = async (req, res,next) => {
    try {
        const { author,prompt, photo } = req.body;
        const result = await cloudinary.uploader.upload(photo, {
            folder: 'posts',
            resource_type: 'auto',
        });
        console.log("Image uploaded successfully",result);
        const newPost = new Post({
            prompt,
            author,
            photo: result.secure_url,
        });
        await newPost.save();
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.log("Failed",error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
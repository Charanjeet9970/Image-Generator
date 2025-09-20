import express from "express";
import { generateAIImage } from "../controllers/GenerateAIImage.js";

const router = express.Router();
router.post("/", generateAIImage);

export default router;

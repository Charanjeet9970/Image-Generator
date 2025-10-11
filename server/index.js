import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import postRoutes from './routes/post.js';
import generateImageRoutes from './routes/generateImage.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: ["https://aiimagegenerator21.netlify.app", "http://localhost:3000"], // Allow your frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json({limit: '100mb' }));
app.use(express.urlencoded({limit: '100mb', extended: true }));


app.use('/api/post', postRoutes);
app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Welcome to the server' });
});
app.use('/api/generateImage', generateImageRoutes);

app.use((err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message, status,success: false });
});
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch((error) => console.log('MongoDB connection error:', error));
        
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

startServer();
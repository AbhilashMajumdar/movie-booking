import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import movieRouter from './routes/movieRoute.js';
import mongoose from 'mongoose';

const server = express();
server.use(express.json());
server.use(cors());
const PORT = process.env.PORT || 5000;

server.use('/api/v1.0/moviebooking', userRouter);
server.use('/api/v1.0/moviebooking', movieRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Could not connect to MongoDB", err);
  process.exit(1);
});
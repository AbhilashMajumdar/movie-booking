import mongoose from "mongoose";
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  await mongoose
    .connect(`${MONGO_URI}/movie-booking`)
    .then(() => {
      console.log("Mongodb connected successfully!");
    })
    .catch((err) => {
      console.log("Error while connecting with MongoDB : " + err);
    });
};
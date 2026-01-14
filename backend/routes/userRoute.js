import express from 'express';
import { forgotPassword, getUserDetails, loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.put('/forgot-password', forgotPassword);
userRouter.get('/get-user-details', getUserDetails);

export default userRouter;
import express from 'express';
import { handleLogin } from '../controller/authController.js';
const authRouter = express.Router();

authRouter.post('/', handleLogin);

export default authRouter;
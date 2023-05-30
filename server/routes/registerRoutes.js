import express from 'express';
import { handleNewUser } from '../controller/registerController.js';
const registerRouter = express.Router();

registerRouter.post('/', handleNewUser);

export default registerRouter;
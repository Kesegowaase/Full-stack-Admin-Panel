import express from 'express';
import { addTitle, getAllTitles, updateTitle, deleteTitle } from '../controller/titleController.js';
import verifyJWT from '../middleware/verifyJWT.js';
const titleRouter = express.Router();

titleRouter.post('/', verifyJWT, addTitle);
titleRouter.get('/', verifyJWT, getAllTitles);
titleRouter.put('/', verifyJWT, updateTitle);
titleRouter.delete('/', verifyJWT, deleteTitle);

export default titleRouter;
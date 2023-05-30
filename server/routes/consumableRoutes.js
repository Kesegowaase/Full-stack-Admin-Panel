import express from 'express';
import { addConsumable, getAllConsumable, updateConsumable, deleteConsumable, getConsumableByID } from '../controller/consumableController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import upload from '../middleware/uploadImage.js';
const consumableRouter = express.Router();

consumableRouter.post('/', verifyJWT, upload.single('image'), addConsumable);
consumableRouter.get('/', verifyJWT, getAllConsumable);
consumableRouter.get('/:id', verifyJWT, getConsumableByID);
consumableRouter.put('/', verifyJWT, upload.single('image'), updateConsumable);
consumableRouter.delete('/', verifyJWT, deleteConsumable);

export default consumableRouter;
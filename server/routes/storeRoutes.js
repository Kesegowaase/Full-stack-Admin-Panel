import express from 'express';
import { addStore, getAllStore, updateStore, deleteStore, getStoreByID } from '../controller/storeController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import upload from '../middleware/uploadImage.js';
const storeRouter = express.Router();

storeRouter.post('/', verifyJWT, upload.single('image'), addStore);
storeRouter.get('/', verifyJWT, getAllStore);
storeRouter.get('/:id', verifyJWT, getStoreByID);
storeRouter.put('/', verifyJWT, upload.single('image'), updateStore);
storeRouter.delete('/', verifyJWT, deleteStore);

export default storeRouter;
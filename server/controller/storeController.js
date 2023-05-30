import Store from '../models/storeModel.js';
import expressAsyncHandler from "express-async-handler"

const addStore = expressAsyncHandler(async (req, res) => {
    if (!req?.body?.name || !req?.body?.address || !req?.body?.phoneNumber || !req?.body?.workingHours || !req?.body?.mapLink || !req?.file) {
        return res.status(400).json({ 'message': 'All blanks are required' });
    }

    try {
        const result = await Store.create({
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            workingHours: req.body.workingHours,
            mapLink: req.body.mapLink,
            image: req.file.path
        });

        return res.send(result);
    } catch (err) {
        console.error(err);
    }
});

const getAllStore = expressAsyncHandler(async (req, res) => {
    const store = await Store.find();
    return res.send(store);
});

const updateStore = expressAsyncHandler(async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const store = await Store.findOne({ _id: req.body.id }).exec();
    if (!store) {
        return res.status(204).json({ "message": `No store matches ID ${req.body.id}.` });
    }
    if (req.body?.name && req.body?.address && req.body?.phoneNumber && req.body?.workingHours && req.body?.mapLink && req.file) {
        store.name = req.body.name;
        store.address = req.body.address;
        store.phoneNumber = req.body.phoneNumber;
        store.workingHours = req.body.workingHours;
        store.mapLink = req.body.mapLink;
        store.image = req.file.path;
        const result = await store.save();
        return res.send(result);
    }

    return res.status(400).json({ 'message': 'All blanks are required' });
});

const deleteStore = expressAsyncHandler(async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Store ID required.' });

    const store = await Store.findOne({ _id: req.body.id }).exec();
    if (!store) {
        return res.status(204).json({ "message": `No store matches ID ${req.body.id}.` });
    }
    const result = await store.deleteOne();
    return res.send(result);
});

const getStoreByID = expressAsyncHandler(async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Store ID required.' });

    const store = await Store.findOne({ _id: req.params.id }).exec();
    if (!store) {
        return res.status(204).json({ "message": `No store matches ID ${req.params.id}.` });
    }
    return res.send(store);
});

export { addStore, getAllStore, updateStore, deleteStore, getStoreByID };
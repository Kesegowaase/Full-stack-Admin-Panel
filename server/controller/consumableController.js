import Consumable from '../models/consumableModel.js';
import expressAsyncHandler from "express-async-handler"
import Title from '../models/titleModel.js';

const addConsumable = expressAsyncHandler(async (req, res) => {
    if (!req?.body?.name || !req?.body?.price || !req?.body?.description || !req?.body?.type || !req?.file) {
        return res.status(400).json({ 'message': 'All blanks are required' });
    }
    const reqTitle = req.body.type;

    const title = await Title.findOne({ titleName: reqTitle }).exec();
    if (!title) return res.send({ error: "Please select valid title" });

    try {
        const result = await Consumable.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            type: req.body.type,
            image: req.file.path
        });

        return res.send(result);
    } catch (err) {
        console.error(err);
    }
});

const getAllConsumable = expressAsyncHandler(async (req, res) => {
    const consumables = await Consumable.find();
    return res.send(consumables);
});

const updateConsumable = expressAsyncHandler(async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const consumable = await Consumable.findOne({ _id: req.body.id }).exec();
    if (!consumable) {
        return res.status(204).json({ "message": `No consumable matches ID ${req.body.id}.` });
    }
    if (req.body?.name && req.body?.price && req.body?.description && req.body?.type && req.file) {
        consumable.name = req.body.name;
        consumable.price = req.body.price;
        consumable.description = req.body.description;
        consumable.type = req.body.type;
        consumable.image = req.file.path;
        const result = await consumable.save();
        return res.send(result);
    }

    return res.status(400).json({ 'message': 'All blanks are required' });
});

const deleteConsumable = expressAsyncHandler(async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Consumable ID required.' });

    const consumable = await Consumable.findOne({ _id: req.body.id }).exec();
    if (!consumable) {
        return res.status(204).json({ "message": `No consumable matches ID ${req.body.id}.` });
    }
    const result = await consumable.deleteOne();
    return res.send(result);
});

const getConsumableByID = expressAsyncHandler(async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Consumable ID required.' });

    const consumable = await Consumable.findOne({ _id: req.params.id }).exec();
    if (!consumable) {
        return res.status(204).json({ "message": `No consumable matches ID ${req.params.id}.` });
    }
    return res.send(consumable);
});

export { addConsumable, getAllConsumable, updateConsumable, deleteConsumable, getConsumableByID };
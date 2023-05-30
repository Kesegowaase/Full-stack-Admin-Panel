import Title from '../models/titleModel.js';
import expressAsyncHandler from "express-async-handler"

const addTitle = expressAsyncHandler(async (req, res) => {
    if (!req?.body?.titleName) {
        return res.status(400).json({ 'message': 'Title name is required' });
    }
    const title = await Title.findOne({ titleName: req?.body?.titleName }).exec();
    if (!title) {
        try {
            const result = await Title.create({
                titleName: req.body.titleName
            });

            res.send(result);
        } catch (err) {
            console.error(err);
        }
    }

});

const getAllTitles = expressAsyncHandler(async (req, res) => {
    const titles = await Title.find();
    res.send(titles);
});

const updateTitle = expressAsyncHandler(async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    console.log(req);
    const title = await Title.findOne({ _id: req.body.id }).exec();
    if (!title) {
        return res.status(204).json({ "message": `No title matches ID ${req.body.id}.` });
    }
    if (req.body?.titleName) {
        title.titleName = req.body.titleName;
        const result = await title.save();
        return res.send(result);
    }
    return res.status(400).json({ 'message': 'All blanks are required' });
});

const deleteTitle = expressAsyncHandler(async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Title ID required.' });

    const title = await Title.findOne({ _id: req.body.id }).exec();
    if (!title) {
        return res.status(204).json({ "message": `No Title matches ID ${req.body.id}.` });
    }
    const result = await title.deleteOne();
    res.send(result);
});

export { addTitle, getAllTitles, updateTitle, deleteTitle };
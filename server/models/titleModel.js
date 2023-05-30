import mongoose from 'mongoose';

const titleSchema = new mongoose.Schema(
    {
        titleName: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

const Title = mongoose.model('Title', titleSchema);
export default Title;
import mongoose from 'mongoose';

const consumableSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        description: { type: String, required: true },
        type: { type: mongoose.Schema.Types.String, ref: 'Title', required: true },
        image: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const Consumable = mongoose.model('Consumable', consumableSchema);
export default Consumable;
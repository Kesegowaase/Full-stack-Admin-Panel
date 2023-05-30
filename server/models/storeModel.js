import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        address: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true },
        workingHours: { type: String, required: true },
        mapLink: { type: String, required: true },
        image: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const Store = mongoose.model('Store', storeSchema);
export default Store;
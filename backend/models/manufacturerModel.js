import mongoose from 'mongoose';

const categoryManufacturerSchema = new mongoose.Schema({
    name: { type: String, required: false },
    discount: { type: Number, required: false },
});

const manufacturerModel = mongoose.model('manufacturer_category', categoryManufacturerSchema);

export default manufacturerModel;

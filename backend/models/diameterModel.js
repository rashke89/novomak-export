import mongoose from 'mongoose';

const categoryDiameterSchema = new mongoose.Schema({
    name: { type: String, required: false },
});

const diameterModel = mongoose.model('diameter_category', categoryDiameterSchema);

export default diameterModel;

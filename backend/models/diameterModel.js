import mongoose from 'mongoose';

const categoryDiameterSchema = new mongoose.Schema({
    name: { type: String, required: false },
    usedCategories: {type: Array, required: false}
});

const diameterModel = mongoose.model('diameter_category', categoryDiameterSchema);

export default diameterModel;

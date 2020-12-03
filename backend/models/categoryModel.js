import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: false },
    discount: { type: Number, required: false },
});

const categoryModel = mongoose.model('category', categorySchema);

export default categoryModel;
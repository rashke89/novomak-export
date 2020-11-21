import mongoose from 'mongoose';

const categoryHeightSchema = new mongoose.Schema({
    name: { type: String, required: false },
});

const heightModel = mongoose.model('height_category', categoryHeightSchema);

export default heightModel;

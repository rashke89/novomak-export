import mongoose from 'mongoose';

const categoryWidthSchema = new mongoose.Schema({
    name: { type: String, required: false },
});

const widthModel = mongoose.model('width_category', categoryWidthSchema);

export default widthModel;

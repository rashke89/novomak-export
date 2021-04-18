import mongoose from 'mongoose';

const categorySeasonSchema = new mongoose.Schema({
    name: { type: String, required: false },
    discount: { type: Number, required: false },
    order: { type: String, required: false },
});

const seasonModel = mongoose.model('season_category', categorySeasonSchema);

export default seasonModel;

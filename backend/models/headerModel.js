import mongoose from 'mongoose';

const headerSchema = new mongoose.Schema({
    text: { type: String, required: false },
    image: { type: String, required: false },
    button: { type: String, required: false },
    link: { type: String, required: false },
    position: { type: String, required: false }
});

const headerModel = mongoose.model('header', headerSchema);

export default headerModel;

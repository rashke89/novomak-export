import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    text: { type: String, required: false },
    image: { type: String, required: false },
    link: { type: String, required: false },
});

const clientModel = mongoose.model('client', clientSchema);

export default clientModel;

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const prodctSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  reviews: [reviewSchema],
});

const prodctSchema_ = new mongoose.Schema({
  ID: { type: String, required: false },
  Sifra: { type: String, required: false },
  Naziv: { type: String, required: true },
  Lager: { type: String, required: false },
  Sirina: { type: String, required: false },
  Visina: { type: String, required: false },
  Precnik: { type: String, required: false },
  Kategorija: { type: String, required: true },
  Sezona: { type: String, required: false },
  Proizvodjac: { type: String, required: false },
  Slika: { type: String, required: false },
  Specifikacija: { type: String, required: false },
  Cena: { type: Number, default: 0, required: false },
  Istaknut: { type: String, default: '0', required: false },
});

const productModel = mongoose.model('Product', prodctSchema_);

export default productModel;

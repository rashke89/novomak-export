import mongoose from 'mongoose';
const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
};

const paymentSchema = {
  paymentMethod: { type: String, required: true }
};

const orderItemSchema = new mongoose.Schema({
  Naziv: { type: String, required: true },
  qty: { type: Number, required: true },
  Slika: { type: String, required: true },
  Cena: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false
  }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  note: { type: String, required: false }
});

const orderSchema = new mongoose.Schema({
  user: userSchema,
  orderItems: [orderItemSchema],
  priceSum: {type: Number, required: true}
}, {
  timestamps: true
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
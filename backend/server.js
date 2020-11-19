import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import categoryRoute from './routes/categoryRoute';
import orderRoute from './routes/orderRoute';
import uploadRoute from './routes/uploadRoute';
import xmlRoute from "./routes/xmlRoute";

const mongodbUrl = config.MONGODB_URL;

/* Mongo connection */
mongoose
  .connect(mongodbUrl, config.mongooseOptions)
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/category', categoryRoute);
app.use('/api/orders', orderRoute);
app.use('/api/xml', xmlRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(config.PORT, () => {
  console.log(`[INFO] Server started at: http://localhost:${config.serverPort}`);
});

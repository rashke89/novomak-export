import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const page = req.query.page;
  const searchKeyword = req.query.searchKeyword
    ? {
        Naziv: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};

  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
      ? { Cena: 1 }
      : { Cena: -1 }
    : { _id: -1 };
  const totalItems = await Product.find({ ...category, ...searchKeyword }).countDocuments();
  const products = await Product.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  ).skip(32*(page-1)).limit(32);
  res.send({products, totalItems});
});

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found.' });
  }
});
router.post('/:id/reviews', isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
router.put('/:id', isAuth, async (req, res) => {
  const productId = req.params.id;
  let product = await Product.findById(productId);
  if (product) {
    product.Sifra= req.body.key;
    product.Naziv= req.body.name;
    product.Lager= req.body.countInStock;
    product.Sirina= req.body.width;
    product.Visina= req.body.height;
    product.Precnik= req.body.diameter;
    product.Kategorija= req.body.category;
    product.Sezona= req.body.season;
    product.Proizvodjac= req.body.manufacturer;
    product.Slika= req.body.image;
    product.Specifikacija= req.body.description;
    product.Cena= Number(req.body.price);

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.post('/', isAuth, async (req, res) => {
  const product = new Product({
    Sifra: req.body.key,
    Naziv: req.body.name,
    Lager: req.body.countInStock,
    Sirina: req.body.width,
    Visina: req.body.height,
    Precnik: req.body.diameter,
    Kategorija: req.body.category,
    Sezona: req.body.season,
    Proizvodjac: req.body.manufacturer,
    Slika: req.body.image,
    Specifikacija: req.body.description,
    Cena: Number(req.body.price)
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
});

export default router;

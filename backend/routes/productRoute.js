import express from 'express';
import Product from '../models/productModel';
import {isAuth, isAdmin} from '../util';
import manufacturerModel from "../models/manufacturerModel";
import seasonModel from "../models/seasonModel";
import categoryModel from "../models/categoryModel";
import widthModel from "../models/widthModel";
import heightModel from "../models/heightModel";
import diameterModel from "../models/diameterModel";

const router = express.Router();

router.post('/', async (req, res) => {
    const category = req.headers.category ? {Kategorija: req.headers.category} : {};
    const filter = req.body;
    delete filter?.searchKeyword;
    delete filter?.sortOrder;
    delete filter?.page;
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
            ? {Cena: 1}
            : {Cena: -1}
        : {_id: -1};
    const totalItems = await Product.find({...category, ...searchKeyword, ...filter}).countDocuments();
    const products = await Product.find({...category, ...searchKeyword, ...filter}).sort(
        sortOrder
    ).skip(32 * (page - 1)).limit(32);
    res.send({products, totalItems});
});

router.get('/:id', async (req, res) => {
    const product = await Product.findOne({_id: req.params.id});
    if (product) {
        let foundCategory = await categoryModel.findOne({name: product.Kategorija});
        if (foundCategory && foundCategory?.discount) {
            if (foundCategory.discount < 0) {
                product.Cena = product.Cena - ((product.Cena * Number(Math.abs(foundCategory.discount))) / 100).toFixed(2);
                res.send(product);
            } else if (foundCategory.discount > 0) {
                product.Cena = Number(product.Cena) + Number(((product.Cena * Number(foundCategory.discount)) / 100).toFixed(2));
                res.send(product);
            }
        } else {
            res.send(product);
        }


    } else {
        res.status(404).send({message: 'Product Not Found.'});
    }
});
router.get('/marked/all', async (req, res) => {
    try {
        const product = await Product.find();
        if (product && product.length) {
            let list = product.filter(item => item.Istaknut === '1');
            let obj = {};
            let num = 0;
            for (let i = 0; i < list.length; i++) {
                if (!(i % 4)) {
                    num = num + 1;
                }
                if (obj[num]) {
                    obj[num] = [...obj[num], list[i]];
                } else {
                    obj[num] = [list[i]];
                }

            }
            res.send(obj);
        } else {
            res.status(404).send({message: 'Product Not Found.'});
        }
    } catch (e) {
        console.log(e);
        res.status(404).send({message: 'Product Not Found.'});
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
        res.status(404).send({message: 'Product Not Found'});
    }
});
router.put('/:id', isAuth, async (req, res) => {
    const productId = req.params.id;
    let product = await Product.findById(productId);
    if (product) {
        product.Sifra = req.body.key;
        product.Naziv = req.body.name;
        product.Lager = req.body.countInStock;
        product.Sirina = req.body.width;
        product.Visina = req.body.height;
        product.Precnik = req.body.diameter;
        product.Kategorija = req.body.category;
        product.Sezona = req.body.season;
        product.Proizvodjac = req.body.manufacturer;
        product.Slika = req.body.image;
        product.Specifikacija = req.body.description;
        product.Cena = Number(req.body.price);
        product.Istaknut = Number(req.body.marked);

        const updatedProduct = await product.save();
        if (updatedProduct) {
            updatedProduct.Proizvodjac && manufacturerModel.findOne({name: updatedProduct.Proizvodjac}, (findErr, findData) => {
                if (!findErr && !findData) {
                    let newCat = new manufacturerModel({name: updatedProduct.Proizvodjac});
                    newCat.save();
                }
            });
            updatedProduct.Sezona && seasonModel.findOne({name: updatedProduct.Sezona}, (findErr, findData) => {
                if (!findErr && !findData) {
                    let newCat = new seasonModel({name: updatedProduct.Sezona});
                    newCat.save();
                }
            });
            updatedProduct.Kategorija && categoryModel.findOne({name: updatedProduct.Kategorija}, (findErr, findData) => {
                if (!findErr && !findData) {
                    let newCat = new categoryModel({name: updatedProduct.Kategorija});
                    newCat.save();
                }
            });
            updatedProduct.Sirina && widthModel.findOne({name: updatedProduct.Sirina}, (findErr, findData) => {
                if (!findErr && !findData) {
                    let newCat = new widthModel({name: updatedProduct.Sirina});
                    newCat.save();
                }
            });
            updatedProduct.Visina && heightModel.findOne({name: updatedProduct.Visina}, (findErr, findData) => {
                if (!findErr && !findData) {
                    let newCat = new heightModel({name: updatedProduct.Visina});
                    newCat.save();
                }
            });
            updatedProduct.Precnik && diameterModel.findOne({name: updatedProduct.Precnik}, (findErr, findData) => {
                if (!findErr && !findData) {
                    let newCat = new diameterModel({name: updatedProduct.Precnik});
                    newCat.save();
                }
            });
            return res
                .status(200)
                .send({message: 'Product Updated', data: updatedProduct});
        }
    }
    return res.status(500).send({message: ' Error in Updating Product.'});
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.send({message: 'Product Deleted'});
    } else {
        res.send('Error in Deletion.');
    }
});

router.post('/new', isAuth, async (req, res) => {
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
        Cena: Number(req.body.price),
        Istaknut: Number(req.body.marked)
    });
    const newProduct = await product.save();

    if (newProduct) {
        newProduct.Proizvodjac && manufacturerModel.findOne({name: newProduct.Proizvodjac}, (findErr, findData) => {
            if (!findErr && !findData) {
                let newCat = new manufacturerModel({name: newProduct.Proizvodjac});
                newCat.save();
            }
        });
        newProduct.Sezona && seasonModel.findOne({name: newProduct.Sezona}, (findErr, findData) => {
            if (!findErr && !findData) {
                let newCat = new seasonModel({name: newProduct.Sezona});
                newCat.save();
            }
        });
        newProduct.Kategorija && categoryModel.findOne({name: newProduct.Kategorija}, (findErr, findData) => {
            if (!findErr && !findData) {
                let newCat = new categoryModel({name: newProduct.Kategorija});
                newCat.save();
            }
        });
        newProduct.Sirina && widthModel.findOne({name: newProduct.Sirina}, (findErr, findData) => {
            if (!findErr && !findData) {
                let newCat = new widthModel({name: newProduct.Sirina});
                newCat.save();
            }
        });
        newProduct.Visina && heightModel.findOne({name: newProduct.Visina}, (findErr, findData) => {
            if (!findErr && !findData) {
                let newCat = new heightModel({name: newProduct.Visina});
                newCat.save();
            }
        });
        newProduct.Precnik && diameterModel.findOne({name: newProduct.Precnik}, (findErr, findData) => {
            if (!findErr && !findData) {
                let newCat = new diameterModel({name: newProduct.Precnik});
                newCat.save();
            }
        });
        return res
            .status(201)
            .send({message: 'New Product Created', data: newProduct});
    }
    return res.status(500).send({message: ' Error in Creating Product.'});
});

export default router;

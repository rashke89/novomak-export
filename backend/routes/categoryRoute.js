import express from 'express';
// import Category from '../models/categoryModel'
import {isAuth, isAdmin} from '../util';
import diameterModel from "../models/diameterModel";
import manufacturerModel from "../models/manufacturerModel";
import heightModel from "../models/heightModel";
import widthModel from "../models/widthModel";
import seasonModel from "../models/seasonModel";
import categoryModel from "../models/categoryModel";


const router = express.Router();

/*Get all categories*/
router.get('/', async (req, res) => {
    const categories = await categoryModel.find();
    const diameters = await diameterModel.find();
    const manufacturers = await manufacturerModel.find();
    const heights = await heightModel.find();
    const widths = await widthModel.find();
    const seasons = await seasonModel.find();
    res.send({categories, diameters, manufacturers, heights, widths, seasons});
});
//
// router.get('/:id', async (req, res) => {
//     const product = await Product.findOne({ _id: req.params.id });
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({ message: 'Product Not Found.' });
//     }
// });
// router.post('/:id/reviews', isAuth, async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//         const review = {
//             name: req.body.name,
//             rating: Number(req.body.rating),
//             comment: req.body.comment,
//         };
//         product.reviews.push(review);
//         product.numReviews = product.reviews.length;
//         product.rating =
//             product.reviews.reduce((a, c) => c.rating + a, 0) /
//             product.reviews.length;
//         const updatedProduct = await product.save();
//         res.status(201).send({
//             data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
//             message: 'Review saved successfully.',
//         });
//     } else {
//         res.status(404).send({ message: 'Product Not Found' });
//     }
// });
router.put('/:category/:id', isAuth, async (req, res) => {
    const categoryId = req.params.id;
    const category = req.params.category;
    let foundCategory;
    switch (category) {
        case 'categories':
            foundCategory = await categoryModel.findById(categoryId, (error, data) => {
                if (error) {
                    return res.status(500).send({message: `Greska prilikom izmene kategorije. Kategorija ne postoji. Naziv kategorije: ${req.body.name}`});
                }
                data.name = req.body.name;
                data.discount = req.body.discount;
                data.save().then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno izmenjena. Naziv kategorije: ${savedItem.name}`, data: savedItem});
                    }
                });
            });
            return;
        case 'manufacturers':
            foundCategory = await manufacturerModel.findById(categoryId, (error, data) => {
                if (error) {
                    return res.status(500).send({message: `Greska prilikom izmene kategorije. Kategorija ne postoji. Naziv kategorije: ${req.body.name}`});
                }
                data.name = req.body.name;
                data.save().then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno izmenjena. Naziv kategorije: ${savedItem.name}`, data: savedItem});
                    }
                });
            });
            return;

        case 'seasons':
            foundCategory = await seasonModel.findById(categoryId, (error, data) => {
                if (error) {
                    return res.status(500).send({message: `Greska prilikom izmene kategorije. Kategorija ne postoji. Naziv kategorije: ${req.body.name}`});
                }
                data.name = req.body.name;
                data.save().then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno izmenjena. Naziv kategorije: ${savedItem.name}`, data: savedItem});
                    }
                });
            });
            return;
        case 'widths':
            foundCategory = await widthModel.findById(categoryId, (error, data) => {
                if (error) {
                    return res.status(500).send({message: `Greska prilikom izmene kategorije. Kategorija ne postoji. Naziv kategorije: ${req.body.name}`});
                }
                data.name = req.body.name;
                data.save().then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno izmenjena. Naziv kategorije: ${savedItem.name}`, data: savedItem});
                    }
                });
            });
            return;
        case 'heights':
            foundCategory = await heightModel.findById(categoryId, (error, data) => {
                if (error) {
                    return res.status(500).send({message: `Greska prilikom izmene kategorije. Kategorija ne postoji. Naziv kategorije: ${req.body.name}`});
                }
                data.name = req.body.name;
                data.save().then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno izmenjena. Naziv kategorije: ${savedItem.name}`, data: savedItem});
                    }
                });
            });
            return;
        case 'diameters':
            foundCategory = await diameterModel.findById(categoryId, (error, data) => {
                if (error) {
                    return res.status(500).send({message: `Greska prilikom izmene kategorije. Kategorija ne postoji. Naziv kategorije: ${req.body.name}`});
                }
                data.name = req.body.name;
                data.save().then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno izmenjena. Naziv kategorije: ${savedItem.name}`, data: savedItem});
                    }
                });
            });
            return;
        default:
            console.log(`[INFO] Edit kategorije, nije pronadjena ni jedna kategorija za: ${req.params.category}`);
            return res
                .status(220)
                .send({message: `EDIT KATEGORIJE - Nije pronadjena ni jedna kategorija za: ${req.params.category}`});
    }
});

router.delete('/:category/:id', isAuth, isAdmin, async (req, res) => {
    const categoryId = req.params.id;
    const category = req.params.category;
    let foundCategory;
    switch (category) {
        case 'categories':
            foundCategory = await categoryModel.findById(categoryId, (error, data) => {
                if (error) {
                    return res.status(500).send({message: `Greska prilikom izmene kategorije. Kategorija ne postoji.`});
                }
                data.remove().then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno obrisana - ${savedItem.name}`, data: savedItem});
                    }
                });
            });
            return;
        case 'manufacturers':
            foundCategory = await manufacturerModel.findById(categoryId, (error, data) => {
                if (error) {
                    return res.status(500).send({message: `Greska prilikom izmene kategorije. Kategorija ne postoji.`});
                }
                data.remove().then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno obrisana - ${savedItem.name}`, data: savedItem});
                    }
                });
            });
            return;

        case 'seasons':
            foundCategory = await seasonModel.findById(categoryId, (error, data) => {
                if (error) {
                    return res.status(500).send({message: `Greska prilikom izmene kategorije. Kategorija ne postoji.`});
                }
                data.remove().then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno obrisana - ${savedItem.name}`, data: savedItem});
                    }
                });
            });
            return;
        case 'widths':
            foundCategory = await widthModel.findById(categoryId, (error, data) => {
                if (error) {
                    return res.status(500).send({message: `Greska prilikom izmene kategorije. Kategorija ne postoji.`});
                }
                data.remove().then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno obrisana - ${savedItem.name}`, data: savedItem});
                    }
                });
            });
            return;
        case 'heights':
            foundCategory = await heightModel.findById(categoryId, (error, data) => {
                if (error) {
                    return res.status(500).send({message: `Greska prilikom izmene kategorije. Kategorija ne postoji.`});
                }
                data.remove().then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno obrisana - ${savedItem.name}`, data: savedItem});
                    }
                });
            });
            return;
        case 'diameters':
            foundCategory = await diameterModel.findById(categoryId, (error, data) => {
                if (error) {
                    return res.status(500).send({message: `Greska prilikom izmene kategorije. Kategorija ne postoji.`});
                }
                data.remove().then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno obrisana - ${savedItem.name}`, data: savedItem});
                    }
                });
            });
            return;
        default:
            console.log(`[INFO] Brisanje kategorije, nije pronadjena ni jedna kategorija za: ${req.params.category}`);
            return res
                .status(220)
                .send({message: `BRISANJE KATEGORIJE - Nije pronadjena ni jedna kategorija za: ${req.params.category}`});

    }
});

router.post('/', isAuth, async (req, res) => {
    // const category = new Category({
    //     name: req.body.name,
    //     // image: req.body.image,
    //     // description: req.body.description,
    // });
    // let newProduct = await category.save();
    // if (newProduct) {
    //     return res
    //         .status(201)
    //         .send({message: 'New Product Created', data: newProduct});
    // }
    // return res.status(500).send({message: ' Error in Creating Category.'});

    const category = req.body.selectedCategory;
    const name = req.body.name;
    let newItem;
    switch (category) {
        case 'categories':
            newItem = new categoryModel({name, discount: req.body.discount});
            newItem.save()
                .then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno kreirana. Naziv kategorije: ${savedItem.name}`, data: savedItem});
                    }
                })
                .catch(error => {
                    return res.status(500).send({message: `Greska prilikom kreiranja kategorije. Naziv kategorije: ${req.body.name}`});
                });

            return;
        case 'manufacturers':
            newItem = new manufacturerModel({name});
            newItem.save()
                .then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno kreirana. Naziv kategorije: ${savedItem.name}`, data: savedItem});
                    }
                })
                .catch(error => {
                    return res.status(500).send({message: `Greska prilikom kreiranja kategorije. Naziv kategorije: ${req.body.name}`});
                });
            return;

        case 'seasons':
            newItem = new seasonModel({name});
            newItem.save()
                .then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno kreirana. Naziv kategorije: ${savedItem.name}`, data: savedItem});
                    }
                })
                .catch(error => {
                    return res.status(500).send({message: `Greska prilikom kreiranja kategorije. Naziv kategorije: ${req.body.name}`});
                });
            return;
        case 'widths':
            newItem = new widthModel({name});
            newItem.save()
                .then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno kreirana. Naziv kategorije: ${savedItem.name}`, data: savedItem});
                    }
                })
                .catch(error => {
                    return res.status(500).send({message: `Greska prilikom kreiranja kategorije. Naziv kategorije: ${req.body.name}`});
                });
            return;
        case 'heights':
            newItem = new heightModel({name});
            newItem.save()
                .then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno kreirana. Naziv kategorije: ${savedItem.name}`, data: savedItem});
                    }
                })
                .catch(error => {
                    return res.status(500).send({message: `Greska prilikom kreiranja kategorije. Naziv kategorije: ${req.body.name}`});
                });
            return;
        case 'diameters':
            newItem = new diameterModel({name});
            newItem.save()
                .then((savedItem) => {
                    if (savedItem) {
                        return res
                            .status(200)
                            .send({message: `Kategorija uspesno kreirana. Naziv kategorije: ${savedItem.name}`, data: savedItem});
                    }
                })
                .catch(error => {
                    return res.status(500).send({message: `Greska prilikom kreiranja kategorije. Naziv kategorije: ${req.body.name}`});
                });
            return;
        default:
            console.log(`[INFO] Kreiranje kategorije, nije pronadjena ni jedna kategorija za: ${req.params.category}`);
            return res
                .status(220)
                .send({message: `EDIT KATEGORIJE - Nije pronadjena ni jedna kategorija za: ${req.params.category}`});
    }
});

export default router;

import express from 'express';
import Category from '../models/categoryModel'
import { isAuth, isAdmin } from '../util';
import diameterModel from "../models/diameterModel";
import manufacturerModel from "../models/manufacturerModel";
import heightModel from "../models/heightModel";
import widthModel from "../models/widthModel";
import seasonModel from "../models/seasonModel";

const router = express.Router();

/*Get all categories*/
router.get('/', async (req, res) => {
    const categories = await Category.find();
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
// router.put('/:id', isAuth, async (req, res) => {
//     const productId = req.params.id;
//     const product = await Product.findById(productId);
//     if (product) {
//         product.name = req.body.name;
//         product.price = req.body.price;
//         product.image = req.body.image;
//         product.brand = req.body.brand;
//         product.category = req.body.category;
//         product.countInStock = req.body.countInStock;
//         product.description = req.body.description;
//         const updatedProduct = await product.save();
//         if (updatedProduct) {
//             return res
//                 .status(200)
//                 .send({ message: 'Product Updated', data: updatedProduct });
//         }
//     }
//     return res.status(500).send({ message: ' Error in Updating Product.' });
// });

// router.delete('/:id', isAuth, isAdmin, async (req, res) => {
//     const deletedProduct = await Product.findById(req.params.id);
//     if (deletedProduct) {
//         await deletedProduct.remove();
//         res.send({ message: 'Product Deleted' });
//     } else {
//         res.send('Error in Deletion.');
//     }
// });

router.post('/', isAuth, async (req, res) => {
    const category = new Category({
        name: req.body.name,
        // image: req.body.image,
        // description: req.body.description,
    });
    const newProduct = await category.save();
    if (newProduct) {
        return res
            .status(201)
            .send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: ' Error in Creating Category.' });
});

export default router;

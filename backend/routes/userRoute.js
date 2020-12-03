import express from 'express';
import User from '../models/userModel';
import {getToken, isAdmin, isAuth} from '../util';
import headerModel from "../models/headerModel";
import Order from "../models/orderModel";

const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: getToken(updatedUser),
        });
    } else {
        res.status(404).send({message: 'User Not Found'});
    }
});

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        });
    } else {
        res.status(401).send({message: 'Invalid Email or Password.'});
    }
});

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        });
    } else {
        res.status(401).send({message: 'Invalid User Data.'});
    }
});

router.post('/header', async (req, res) => {
    const headerId = req.body?.id;
    if (headerId) {
        const findHeader = await headerModel.findById(headerId);
        if (findHeader) {
            findHeader.text = req.body.text;
            findHeader.button = req.body.button;
            findHeader.image = req.body.image;
            findHeader.link = req.body.link;
            findHeader.position = req.body.position;
            const newHeader = await findHeader.save();
            if (newHeader) {
                res.send({newHeader});
            } else {
                res.status(401).send({message: 'Greska prilikom izmene headera.'});
            }
        }else {
          res.status(401).send({message: 'Greska, ovaj header ne postoji.'});
        }
    } else {
        const header = new headerModel({
            text: req.body.text,
            image: req.body.image,
            link: req.body.link,
            button: req.body.button,
            position: req.body.position,
        });
        const newHeader = await header.save();
        if (newHeader) {
            res.send({...newHeader});
        } else {
            res.status(401).send({message: 'Greska prilikom kreiranja headera.'});
        }
    }

    // const newUser = await user.save();
    // if (newUser) {
    //   res.send({
    //     _id: newUser.id,
    //     name: newUser.name,
    //     email: newUser.email,
    //     isAdmin: newUser.isAdmin,
    //     token: getToken(newUser),
    //   });
    // } else {
    //   res.status(401).send({ message: 'Invalid User Data.' });
    // }
});

router.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            name: 'Basir',
            email: 'admin@example.com',
            password: '1234',
            isAdmin: true,
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({message: error.message});
    }
});
router.get('/header', async (req, res) => {
    try {
        const headers = await headerModel.find();
        res.send(headers);
    } catch (error) {
        res.send({message: error.message});
    }
});

router.delete("/header/:id", async (req, res) => {
    const header = await headerModel.findOne({_id: req.params.id});
    if (header) {
        const deletedHeader = await header.remove();
        res.send(deletedHeader);
    } else {
        res.status(404).send("Order Not Found.")
    }
});

export default router;

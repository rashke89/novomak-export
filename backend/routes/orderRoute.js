import express from 'express';
import Order from '../models/orderModel';
import {isAuth, isAdmin} from '../util';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

const router = express.Router();
const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'novomak.export.prodaja@gmail.com', // generated ethereal user
        pass: 'novomak.export2020', // generated ethereal password
    },
});

let mailOption = {
    from: 'novomak.export.prodaja@gmail.com',
    to: 'novomakexport@yahoo.com',
    subject: '',
    html: ``
};

router.get("/", isAuth, async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
});
router.get("/mine", isAuth, async (req, res) => {
    let page = req.query.page;
    let searchKeyword = req.query.search || '';
    let totalItems = await Order.find().countDocuments();
    let orders;
    if (searchKeyword) {
        if (mongoose.Types.ObjectId.isValid(searchKeyword)) {
            orders = await Order.find({
                _id: searchKeyword
            }).sort({createdAt: -1}).skip(30 * (page - 1)).limit(30);
            totalItems = await Order.find({
                _id: searchKeyword
            }).countDocuments();
        } else {
            orders = await Order.find({
                'user.fullName': {
                    $regex: searchKeyword,
                    $options: 'i',
                }
            }).sort({createdAt: -1}).skip(30 * (page - 1)).limit(30);
            totalItems = await Order.find({
                'user.fullName': {
                    $regex: searchKeyword,
                    $options: 'i',
                }
            }).countDocuments();
        }

    } else {
        orders = await Order.find().sort({createdAt: -1}).skip(30 * (page - 1)).limit(30);
    }

    res.send({orders, totalItems});
});

router.get("/:id", async (req, res) => {
    const order = await Order.findOne({_id: req.params.id});
    if (order) {
        res.send(order);
    } else {
        res.status(404).send("Order Not Found.")
    }
});

router.delete("/:id", isAdmin, async (req, res) => {
    const order = await Order.findOne({_id: req.params.id});
    if (order) {
        const deletedOrder = await order.remove();
        res.send(deletedOrder);
    } else {
        res.status(404).send("Order Not Found.")
    }
});

router.post("/", async (req, res) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    res.status(201).send({message: "New Order Created", data: newOrderCreated});
});

router.post("/submit", async (req, res) => {
    console.log('order body submit...', req.body);
    req.body.cart.cartItems.map(item => {
        item.product = item;
        return item;
    });
    const newOrder = new Order({
        orderItems: [...req.body.cart.cartItems],
        user: {...req.body.user, fullName: `${req.body.user.name} ${req.body.user.lastName}`},
        priceSum: req.body.priceSum
    });

    const newOrderCreated = await newOrder.save();
    if (newOrderCreated) {

        /*Mail for novomak*/
        mailOption.text = `Porudzbina: ${newOrderCreated._id}`;
        mailOption.subject = `Porudzbina: ${newOrderCreated._id}`;
        mailOption.html = `<h3>Porudzbina: ${newOrderCreated._id}</h3>
<br/>
<p>Korisnik: ${newOrderCreated.user.name} ${newOrderCreated.user.lastName}</p>
<p>E-mail: ${newOrderCreated.user.email}</p>
<p>Telefon: ${newOrderCreated.user.phone}</p>
<p>Adresa: ${newOrderCreated.user.address}, ${newOrderCreated.user.city}</p>
<p>Napomena: ${newOrderCreated.user.note}</p>
<h4>Proizvodi:</h4>
${newOrderCreated.orderItems.map(item => {
            let link = `https://novomak.herokuapp.com/product/${item._id}`;
            return `<p>
      <div style="width: 70px; height: auto; display: inline-block">
        <img src=${item.Slika} alt="Slika proizvoda" style="width: 100%; height: auto" />
      </div>
    <div style="width: max-content; display: inline-block">
      <span>
        ${item.Naziv}
      </span><br>
      <span>
        kolicina: ${item.qty}
      </span><br>
      <span>
        Cena: ${item.Cena} rsd
      </span><br>
      <span>
        Proizvod: <a href=${link}>Link</a>
      </span>
    </div>
    <hr>
    
  </p>`
        })}
<br>

<h4>Ukupno za naplatu: ${newOrderCreated.priceSum} rsd</h4>`;


        /*Mail for customer*/
        transport.sendMail(mailOption, (err, data) => {
            if (err)
                console.log(err);
            else {
                mailOption.subject = 'Novomak Export Porudzbina';
                mailOption.to = newOrderCreated.user.email;
                mailOption.html = `<h4>Porudzbina: ${newOrderCreated._id}</h4>
<br/>
<p>Postovani <span style="text-transform: capitalize;">${newOrderCreated.user.fullName}</span> , Vasa porudzbina je primljena i trenutno je u obradi.</p>

<h4>Proizvodi:</h4>
${newOrderCreated.orderItems.map(item => {
                    let link = `https://novomak.herokuapp.com/product/${item._id}`;
                    return `<p>
      <div style="width: 70px; height: auto; display: inline-block">
        <img src=${item.Slika} alt="Slika proizvoda" style="width: 100%; height: auto" />
      </div>
    <div style="width: max-content; display: inline-block">
      <span>
        ${item.Naziv}
      </span><br>
      <span>
        kolicina: ${item.qty}
      </span><br>
      <span>
        Cena: ${item.Cena} rsd
      </span><br>
      <span>
        Proizvod: <a href=${link}>Link</a>
      </span>
    </div>
    <hr>
  </p>`
                })}
<br>

<h4>Ukupno za naplatu: ${newOrderCreated.priceSum} rsd</h4>
<p>Ukoliko imate dodatnih pitanja, slobodno nas kontaktirajte.</p>
<img src="http://www.novomak-export.com/wp-content/uploads/2013/06/novomak-logo2.png" alt="Novomak logo" />
<p>Telefon: 022/314-740</p>
<p>Kralja Petra I Karađorđevića 78, Stara Pazova 22300</p>`;
                transport.sendMail(mailOption);
            }
        });
        res.status(201).send({message: "New Order Created", data: {newOrder}});
    } else
        res.status(500).send({message: "Error", data: {}});
});

router.put("/:id/pay", async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment = {
            paymentMethod: 'paypal',
            paymentResult: {
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.paymentID
            }
        }
        const updatedOrder = await order.save();
        res.send({message: 'Order Paid.', order: updatedOrder});
    } else {
        res.status(404).send({message: 'Order not found.'})
    }
});

export default router;
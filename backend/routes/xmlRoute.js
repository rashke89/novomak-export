import express from 'express';
import Category from '../models/categoryModel'
import { isAuth, isAdmin } from '../util';
import multer from "multer";
import {parseString} from 'xml2js';
import fs from 'fs';
import util from 'util';
import jp from 'jsonpath';
const {JSONPath} = require('jsonpath-plus');
import Product from '../models/productModel';
import widthModel from '../models/widthModel';
import heightModel from "../models/heightModel";
import diameterModel from "../models/diameterModel";
import manufacturerModel from "../models/manufacturerModel";
import seasonModel from "../models/seasonModel";
import categoryModel from "../models/categoryModel";
// var inspect = require('eyes').inspector({maxLength: false})

const router = express.Router();
let lastUploadedFile = '';

/*Get all categories*/
router.get('/', async (req, res) => {
    const products = await Category.find();
    res.send(products);
});
const getDateString = () => new Date().toISOString();
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${getDateString()}-${file.originalname}`);
        lastUploadedFile = `${getDateString()}-${file.originalname}`
    },
});
const upload = multer({ storage });
var productList = [];
var newProduct = {};
const obj = {
    ITEM: {
        _start: '<item>',
        _end: '</item>'
    },
    ID: {
        name: 'ID',
        _start: '<ID>',
        _end: '</ID>',
        dbProperty: 'id'
    },
    KEY: {
        name: 'Sifra',
        _start: '<Sifra>',
        _end: '</Sifra>',
        dbProperty: 'key'
    },
    NAME: {
        name: 'Naziv',
        _start: '<Naziv>',
        _end: '</Naziv>',
        dbProperty: 'name'
    },
    UNITS: {
        name: 'Lager',
        _start: '<Lager>',
        _end: '</Lager>',
        dbProperty: 'units'
    },
    WIDTH: {
        name: 'Sirina',
        _start: '<Sirina>',
        _end: '</Sirina>',
        dbProperty: 'width'
    },
    HEIGHT: {
        name: 'Sirina',
        _start: '<Visina>',
        _end: '</Visina>',
        dbProperty: 'height'
    },
    DIAMETER: {
        _start: '<Precnik>',
        _end: '</Precnik>',
        dbProperty: 'diameter'
    },
    CATEGORY: {
        _start: '<Kategorija>',
        _end: '</Kategorija>',
        dbProperty: 'category'
    },
    SEASON: {
        _start: '<Sezona>',
        _end: '</Sezona>',
        dbProperty: 'season'
    },
    MANUFACTURER: {
        _start: '<Proizvodjac>',
        _end: '</Proizvodjac>',
        dbProperty: 'manufacturer'
    },
    PRICE: {
        _start: '<Cena>',
        _end: '</Cena>',
        dbProperty: 'price'
    },
    SPECIFICATION: {
        _start: '<Specifikacija>',
        _end: '</Specifikacija>',
        dbProperty: 'specification'
    },
    IMAGE: {
        _start: '<Slika>',
        _end: '</Slika>',
        dbProperty: 'image'
    }
};
const cdataException = {
    _start: '<![CDATA[',
    _end: ']]>'
};
let firstIndex, lastIndex;

router.post('/',  upload.single('xml'), async (req, res) => {
    await fs.readFile(`./uploads/${lastUploadedFile}`, function(err, data) {
        if (err) {
            console.log('[ERROR] error in reading XML file', err);
            return res.status(501).send({ message: `${err}` });
        }
        parseString(data, function (errParse, result) {

            if (errParse) {
                console.log('[ERROR] error in parsing XML file', errParse);
                return res.status(502).send({ message: `${errParse}` });
            }

            let b = JSON.stringify(result);
            try {
                var a = JSON.parse(b).items.item.map(item => {
                    newProduct = {};
                    Object.keys(item).forEach(key => {
                        newProduct[key] = item[key][0]
                    });
                    productList.push(newProduct);
                });
                Promise.all(a).then(completed => {
                    console.log('--- CREATING LITS COMPLETED.');
                    productList.forEach(item => {
                        let product = new Product({...item});
                        let pr = product.save();
                    });
                    let sirina = [...new Set(productList.map(item => item.Sirina))];
                    let visina = [...new Set(productList.map(item => item.Visina))];
                    let precnik = [...new Set(productList.map(item => item.Precnik))];
                    let kategorija = [...new Set(productList.map(item => item.Kategorija))];
                    let sezona = [...new Set(productList.map(item => item.Sezona))];
                    let proizvodjac = [...new Set(productList.map(item => item.Proizvodjac))];
                    if (proizvodjac && proizvodjac.length) {
                        proizvodjac.forEach(item => {
                            if (!item) {
                                return;
                            }
                            manufacturerModel.findOne({name: item}, (findErr, findData) => {
                                if (!findErr && !findData) {
                                    let newCat = new manufacturerModel({name: item})
                                    newCat.save();
                                }
                            })
                        })
                    }
                    if (sezona && sezona.length) {
                        sezona.forEach(item => {
                            if (!item) {
                                return;
                            }
                            seasonModel.findOne({name: item}, (findErr, findData) => {
                                if (!findErr && !findData) {
                                    let newCat = new seasonModel({name: item})
                                    newCat.save();
                                }
                            })
                        })
                    }
                    if (kategorija && kategorija.length) {
                        kategorija.forEach(item => {
                            if (!item) {
                                return;
                            }
                            categoryModel.findOne({name: item}, (findErr, findData) => {
                                if (!findErr && !findData) {
                                    let newCat = new categoryModel({name: item})
                                    newCat.save();
                                }
                            })
                        })
                    }
                    if (sirina && sirina.length) {
                        sirina.forEach(item => {
                            if (!item) {
                                return;
                            }
                            widthModel.findOne({name: item}, (findErr, findData) => {
                                if (!findErr && !findData) {
                                    let newCat = new widthModel({name: item})
                                    newCat.save();
                                }
                            })
                        })
                    }
                    if (visina && visina.length) {
                        visina.forEach(item => {
                            if (!item) {
                                return;
                            }
                            heightModel.findOne({name: item}, (findErr, findData) => {
                                if (!findErr && !findData) {
                                    let newCat = new heightModel({name: item})
                                    newCat.save();
                                }
                            })
                        })
                    }
                    if (precnik && precnik.length) {
                        precnik.forEach(item => {
                            if (!item) {
                                return;
                            }
                            diameterModel.findOne({name: item}, (findErr, findData) => {
                                if (!findErr && !findData) {
                                    let newCat = new diameterModel({name: item})
                                    newCat.save();
                                }
                            })
                        })
                    }

                    fs.writeFile(`./uploads/${lastUploadedFile}.json`, JSON.stringify(productList), function (err, data) {
                        if (err) return console.log(err);
                        console.log('[SUCCESS] Successfully created JSON file for new products from XML file', lastUploadedFile);
                        lastUploadedFile = '';
                        productList = [];
                        if (req) {
                            return res
                                .status(201)
                                .send({ message: 'Successfully added products from XML file.', data: null });
                        }
                    });
                })
            } catch (e) {
                lastUploadedFile = '';
                productList = [];
                return res.status(500).send({ message: ' Error in Adding Products. [002]' });
            }


        });
    });


});

export default router;

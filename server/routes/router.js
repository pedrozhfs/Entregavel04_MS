const express = require('express');
const route = express.Router();
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const dotenv = require('dotenv');
const path = require('path');
    dotenv.config({path: './config.env'})

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 * @description Root Route
 * @method GET /
 */
route.get('/', services.homeRoutes);

/**
 * @description add product
 * @method GET /add-product
 */

route.get('/add-product', services.add_product);

/**
 * @description update product
 * @method PUT /update-product
 */ 

route.get('/update-product', services.update_product);

/**
 * @description get emails
 * @method PUT /list-email
 */ 

 route.get('/list-email', services.list_email);

//--------------------------------------------
route.post('/api/products', controller.create);
route.get('/api/products', controller.find);
route.put('/api/products/:id', controller.update);
route.delete('/api/products/:id', controller.delete);
route.get('/api/list-email', controller.findEmail);
route.post('/api/send-email', controller.createEmail);

module.exports = route;
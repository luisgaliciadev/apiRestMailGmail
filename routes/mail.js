'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
var nodemailer = require('nodemailer');
var SEED = require('../config/config').SEED;

// Enviar Mail
app.post('/sendMail', async (req, res, next ) => {       
    var body = req.body;
    var name = body.name;
    var mail = body.mail;
    var subject = body.subject;   
    var message = body.message;  
    var KEY_MAIL = body.KEY_MAIL;

    if (KEY_MAIL !== SEED) {
        return res.status(400).send({
            ok: false,
            message: 'Error de autenticación.'
        });
    }

    var contentHtml = `           
    <div>
        <h2>Mensaje desde Portafolio</h2>   
        <label><b>Nombre: </b> ${name}</label>  
        <br>
        <label><b>Correo: </b> ${mail}</label> 
        <br>
        <label><b>Mensaje: </b></label> 
        <p>${message}</p>
    </div>
    `;
    /////////////////////////////////////////////////////////
    // send email              
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'yourmail@gmail.com',
            pass: 'yourPassword'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });            
    var infoMail = '';           
    var infoMail = await transporter.sendMail({
        from: `Your name <yourmail@gmail.com>`,
        to: 'mail@mail.com',
        subject: subject,
        html: contentHtml
    });
    if (infoMail) {
        return res.status(200).send({
            ok: true,
            infoMail: infoMail.messageId,
        });
    } else {
        return res.status(400).send({
            ok: false,
            message: 'mail not sent.'
        });
    }
});
// End send email

module.exports = app;

'use strict'

var express = require('express');
var app = express();
var nodemailer = require('nodemailer');

// Enviar Mail
app.post('/sendMail', async (req, res, next ) => {       
    var body = req.body; 
    var name = '';
    var mail = '';
    var subject = '';   
    var message = '';  
    var contentHtml = `           
    <div>
        <h2>Message</h2>   
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
            user: 'your_mail@gmail.com',
            pass: 'your_password'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });            
    var infoMail = '';           
    var infoMail = await transporter.sendMail({
        from: `Your name <your_mail@gmail.com>`,
        to: 'the_mail@mail.com',
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

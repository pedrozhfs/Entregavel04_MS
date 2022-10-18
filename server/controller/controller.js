var ProdutoDB = require('../model/model');
var EmailDB = require('../model/emaildb');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const dotenv = require('dotenv');
const path = require('path');
    dotenv.config({path: './config.env'})


exports.create=(req, res) => {
    if(!req.body){
        res.status(400).send({message: "Não pode ser nulo"});
        return;
    }

    const produto = new ProdutoDB({
        nomeProduto: req.body.nomeProduto,
        tipoProduto: req.body.tipoProduto,
        categoriaProduto: req.body.categoriaProduto,
        precoProduto: req.body.precoProduto
    })

    produto.save(produto).then(data => {
        //res.send(data)
        res.redirect(307, '/api/send-email');
        

    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Não foi possível cadastrar o produto"
        });
    });

}

exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        ProdutoDB.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Não foi possível encontrar o produto"})
            } else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message:"Erro ao encontrar o produto"})
        })

    } else{
        ProdutoDB.find().then(produto =>{
            res.send(produto)
        }).catch(err =>{
            res.status(500).send({message: err || "Não foi possível listar os produtos"})
        })
    }    
}

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({message: "Os dados não podem estar em branco"})
    }
 
    const id = req.params.id;
    ProdutoDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if(!data) {
            res.stauts(404).send({message: "Não foi possível atualizar os dados do produto"})
        } else{
            res.send({message: "Produto atualizado com sucesso!"})
        }
    })
    .catch(err =>{
        res.status(500).send({message: "Erro ao atualizar os dados do produto"})
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    ProdutoDB.findByIdAndDelete(id).then(data=>{
        if(!data){
            res.status(404).send({message:"Os dados não podem estar em branco"})
        }else{
            res.send({
                message: "Produto removido com sucesso!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Não foi possível remover esse produto"
        });
    });

    exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        ProdutoDB.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Não foi possível encontrar o produto"})
            } else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message:"Erro ao encontrar o produto"})
        })

    } else{
        ProdutoDB.find().then(produto =>{
            res.send(produto)
        }).catch(err =>{
            res.status(500).send({message: err || "Não foi possível listar os produtos"})
        })
    }    
}
}
exports.findEmail = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        EmailDB.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Não foi possível encontrar o email"})
            } else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message:"Erro ao encontrar o email"})
        })

    } else{
        EmailDB.find().then(email =>{
            res.send(email)
        }).catch(err =>{
            res.status(500).send({message: err || "Não foi possível listar os emails"})
        })
    }    
}

exports.createEmail = (req, res) => {
    try {
        if(!req.body){
            res.status(400).send({message: "Não pode ser nulo"});
            return;
        } else {
            const email = new EmailDB({
                emailFrom: 'fiapeiros16@gmail.com',
                emailTo: 'pedroz.fernandes@hotmail.com',
                subject: 'Produto Cadastrado',
                text: 'Produto cadastrado com sucesso!',
                sendDateEmail: new Date(),
                statusEmail: 'SEND'
                })

            const mailOptions = {
                from: 'fiapeiros16@gmail.com',
                to: email.emailTo,
                subject: email.subject,
                text: email.text
                }

                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_MAIL_HOST,
                    port: process.env.SMTP_MAIL_PORT,
                    auth: {
                        user: process.env.SMTP_MAIL_USERNAME, 
                        pass: process.env.SMTP_MAIL_PASSWORD,
                    }
                })
                transporter.sendMail(mailOptions, function(err, info){
                    if(err){
                        res.status(500).send({
                            message: "Não foi possível enviar o e-mail."});
                    } else {
                        email.save(email).then(data => {
                            res.redirect('/');
                        })
                    }
                })
        }

    } catch(error) {
        console.log('Error: ', error);

    }
}










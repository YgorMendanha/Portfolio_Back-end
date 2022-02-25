const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require('nodemailer');
const app = express();
require("dotenv").config();


app.use(cors({
    origin:['https://ygormendanha.github.io']
})) 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/sendEmail', async (req, res)=>{
    const {name, subject, contact, message} = req.body
    console.log(req.body)
    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORTe,
        secure: false,  
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        }})  
        var Message = {
            from: "NoteApp",
            to: process.env.EMAIL,
            subject: "Contato pelo Portifolio!",
            text: "Contato pelo Portifolio!",
            html: `<p>Nome: ${name}</p><p>Assunto: ${subject}</p><p>Forma de Contato: ${contact}</p><p>Messagem: ${message}</p>`
          };
        transporter.sendMail(Message, (e) => {
            if(e){  
                return res.json({erros:"Houve um Error ao Enviar o E-mail!"}).status(500)
            }else{
              return res.json({message:"E-mail enviado, logo Retornaremos o Contato!"}).status(201)
            }

        })           
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`)
})
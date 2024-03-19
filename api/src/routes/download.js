const express = require('express')
const path = require("path")
const { CreateDocx } = require('../config/modify')

const routerdes = express.Router()



routerdes.post('/descargar-docx', (req, res) => {
  const {body} = req
console.log(body)
   CreateDocx(body)
    /*
  const docxFilePath = path.join(__dirname,'../public/Informe.docx')
 
    res.download(docxFilePath); */
res.send('hola')
});



module.exports = { routerdes } 

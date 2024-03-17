const express = require('express')
const path = require("path")
const { CreateDocx } = require('../config/modify')

const routerdes = express.Router()



routerdes.get('/descargar-docx', (req, res) => {
  CreateDocx()
  const docxFilePath = path.join(__dirname,'../public/Informe.docx')
 
    res.download(docxFilePath);

});



module.exports = { routerdes } 

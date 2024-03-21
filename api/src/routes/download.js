const express = require('express')
const path = require("path")
const {CreateDoxc} = require('../config/modify')

const routerdes = express.Router()



routerdes.post('/descargar-docx', (req, res) => {
  const {body} = req

  CreateDoxc(body)
    
    const docxFilePath = path.join(__dirname,'../public/Reporte.docx')
 
    res.download(docxFilePath); 

});



module.exports = { routerdes } 

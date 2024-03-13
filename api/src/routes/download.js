const express = require('express')
const path = require("path")

const routerdes = express.Router()



routerdes.get('/descargar-docx', (req, res) => {
    const docxFilePath = path.join('/workspaces/Adatar/api/src/public/Informe.docx');
    res.download(docxFilePath);
  });



module.exports = { routerdes } 

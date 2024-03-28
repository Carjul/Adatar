const express = require('express')
const {unlink} = require("fs")
const path = require("path")
const {CreateDoxc} = require('../config/docx')

const routerdes = express.Router()



routerdes.post('/descargar-docx', async(req, res) => {
  const {body} = req

  try {
    await CreateDoxc(body)
      
    const docxFilePath = path.join(__dirname,'../public/Reporte.docx')
   
    res.download(docxFilePath, () => {
     
      unlink(docxFilePath, (err) => {
        if (err) {
          console.error('Error al eliminar el archivo:', err);
        }
      }); 

    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al crear o descargar el archivo');
  }

});



module.exports = { routerdes } 

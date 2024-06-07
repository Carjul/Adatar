const express = require('express');
const { unlink, existsSync } = require('fs');
const path = require('path');
const { CreateDoxc } = require('../config/docx');

const routerdes = express.Router();

routerdes.post('/descargar-docx', async (req, res) => {
  const { body } = req;

  try {
    await CreateDoxc(body);
    
    const docxFilePath = path.join(__dirname, '../public/Reporte.docx');

    if (existsSync(docxFilePath)) {
      res.download(docxFilePath, (err) => {
        if (err) {
          console.error('Error al descargar el archivo:', err);
          res.status(500).send('Ocurrió un error al descargar el archivo');
          return;
        }

        unlink(docxFilePath, (err) => {
          if (err) {
            console.error('Error al eliminar el archivo:', err);
          }
        });
      });
    } else {
      res.status(404).send('Archivo no encontrado');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Ocurrió un error al crear o descargar el archivo');
  }
});

module.exports = { routerdes };

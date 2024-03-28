const path = require("path");
const {Packer,Document, ExternalHyperlink, HeadingLevel, ImageRun, Paragraph,  Table, TableCell, TableRow, TextDirection, TextRun, VerticalAlign, } = require("docx");
const { readFileSync, writeFileSync, unlink } = require('fs');




const func = async ({ Estudiantes, ImagenBar, ImagenPie }) => {
  const doc = new Document({
    sections: [
      {
            children: [
                new Paragraph("Hello World"),
                new Paragraph({
                    children: [
                        new ImageRun({
                            type: "png",
                            data: readFileSync(ImagenBar+".png"),
                            transformation: {
                                width: 600,
                                height: 500,
                            },
                            altText: {
                                title: "This is an ultimate title",
                                description: "This is an ultimate image",
                                name: "My Ultimate Image",
                            },
                        }),
                    ],
                }),
            
                new Paragraph({
                    children: [
                        new ImageRun({
                            type: "png",
                            data: readFileSync(ImagenPie+".png"),
                            transformation: {
                              width: 600,
                              height: 500,
                          },
                            altText: {
                              title: "This is an ultimate title",
                              description: "This is an ultimate image",
                              name: "My Ultimate Image",
                          },
                        }),
                    ],
                }),
            ],
        },
    ]
  });

  

  // Guardar el documento
  const buffer = await Packer.toBuffer(doc);
  return buffer;
};



 function guardarImagenDesdeBase64(base64String, filename) {
    // Separar la cadena base64 y los datos de la imagen
    const base64Data = base64String.split(';base64,').pop();
    
    // Decodificar los datos base64
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Escribir los datos en un archivo .png
     writeFileSync(filename + '.png', buffer, (err) => {
          if (err) throw err;
    });
}





const CreateDoxc = async (obj) => {

  if (!obj.ImagenBar || !obj.ImagenPie || !obj.Estudiantes) {
    return;
  }
  const savePathPie = path.join(__dirname, './imagenpie');
  const savePathBar = path.join(__dirname, './imagenbar');

  try {
    await Promise.all([
      guardarImagenDesdeBase64(obj.ImagenPie, savePathPie),
      guardarImagenDesdeBase64(obj.ImagenBar, savePathBar)
    ]);

  } catch (error) {
    console.error('Error al convertir SVG a PNG:', error);
    return;
  }

  let Estudiantes = obj.Estudiantes;

  try {


    const doc = await func({ Estudiantes, ImagenBar: savePathBar, ImagenPie: savePathPie });
  
    writeFileSync(path.resolve(__dirname, "../public/Reporte.docx"), doc);

   
     unlink(savePathPie + '.png', (err) => {
       if (err) throw err;
     });
     unlink(savePathBar + '.png', (err) => {
       if (err) throw err;
     });
  } catch (error) {
    console.error('Error al generar el documento:', error);
  }
}




module.exports = { CreateDoxc }
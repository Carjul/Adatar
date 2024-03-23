const path = require("path");
const { ExternalHyperlink, HeadingLevel, ImageRun, Paragraph, patchDocument, PatchType, Table, TableCell, TableRow, TextDirection, TextRun, VerticalAlign, } = require("docx");
const { readFileSync, writeFileSync, unlink } = require('fs');
const { svg2png } = require('svg-png-converter');



const func = ({ Estudiantes, ImagenBar, ImagenPie }) => {
  return patchDocument(readFileSync(path.resolve(__dirname, "Plantilla.docx")), {
    patches: {
      my_patch: {
        type: PatchType.PARAGRAPH,
        children: [new TextRun("Sir. "), new TextRun("John Doe"), new TextRun("(The Conqueror)")],
      },
      my_second_patch: {
        type: PatchType.DOCUMENT,
        children: [
          new Paragraph("Lorem ipsum paragraph"),
          new Paragraph("Another paragraph"),
          new Paragraph({
            children: [
              new TextRun("This is a "),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: "Google Link",
                  }),
                ],
                link: "https://www.google.co.uk",
              }),
              new ImageRun({ type: 'jpg', data: readFileSync(ImagenPie + ".jpg"), transformation: { width: 600, height: 500 } }),
              new Paragraph("Another paragraph"),
              new ImageRun({ type: 'jpg', data: readFileSync(ImagenBar + ".jpg"), transformation: { width: 600, height: 500 } }),
            ],
          }),
        ],
      },
      table: {
        type: PatchType.DOCUMENT,
        children: [


          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Identificación")] }),
                  new TableCell({ children: [new Paragraph("Nombres")] }),
                  new TableCell({ children: [new Paragraph("Perdio")] }),
                  new TableCell({ children: [new Paragraph("Gano")] }),
                  new TableCell({ children: [new Paragraph("Cantidad de Materias")] }),
                  new TableCell({ children: [new Paragraph("% Perdida")] }),
                ],
                cantSplit: true,
              }),
              new TableRow({
                children: [
                  Estudiantes.forEach(element => {
                    new TableCell({ children: [new Paragraph(element.identificacion)] }),
                      new TableCell({ children: [new Paragraph(element.nombres)] }),
                      new TableCell({ children: [new Paragraph(element.perdio.toString())] }),
                      new TableCell({ children: [new Paragraph(element.gano.toString())] }),
                      new TableCell({ children: [new Paragraph(element.cantidad_materias.toString())] }),
                      new TableCell({ children: [new Paragraph(element.porcentaje_perdida.toString())] })
                  })
                ]
              }),

            ]
          }),
        ],
      },
    },
  })
}



async function convertSvgToPng(svgString, filepath) {

  writeFileSync(filepath + '.svg', svgString);

  let outputBuffer = await svg2png({
    input: readFileSync(filepath + '.svg'),
    encoding: 'buffer',
    format: 'jpeg',
  });

  writeFileSync(filepath + '.jpg', outputBuffer);

  unlink(filepath + '.svg', (err) => {
    if (err) throw err;
  });

}


const CreateDoxc = async (obj) => {

  if (!obj.ImagenBar || !obj.ImagenPie || !obj.Estudiantes) {
    return;
  }
  const savePathPie = path.join(__dirname, './data/imagenpie');
  const savePathBar = path.join(__dirname, './data/imagenbar');

  try {
    await Promise.all([
      convertSvgToPng(obj.ImagenPie, savePathPie),
      convertSvgToPng(obj.ImagenBar, savePathBar)
    ]);

  } catch (error) {
    console.error('Error al convertir SVG a PNG:', error);
    return;
  }

  let Estudiantes = obj.Estudiantes;

  try {
    const doc = await func({ Estudiantes, ImagenBar: savePathBar, ImagenPie: savePathPie });
    
    writeFileSync(path.resolve(__dirname, "../public/Reporte.docx"), doc);

    unlink(savePathPie + '.jpg', (err) => {
      if (err) throw err;
    });
    unlink(savePathBar + '.jpg', (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error('Error al generar el documento:', error);
  }
}




module.exports = { CreateDoxc }
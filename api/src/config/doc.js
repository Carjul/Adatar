const fs = require("fs");
const { Document, Packer, Paragraph, TextRun,ImageRun,Header,Footer }= require("docx");

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
const image = new ImageRun({
    type: 'png',
    data: fs.readFileSync(__dirname+'/descarga.png'),
    transformation: {
        width: 100,
        height: 100,
    },
});

const header = new Header({
  children: [
    new Paragraph({
      children: [
        new TextRun("Encabezado del documento"),
      ],
    }),
    new Paragraph({
      children: [
        image,
        new TextRun("Texto en el encabezado"),
      ],
    }),
  ],
});

// Crear pie de página
const footer = new Footer({
  children: [
    new Paragraph({
      children: [
        new TextRun("Pie de página del documento"),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun("Texto en el pie de página"),
      ],
    }),
  ],
});

// Crear documento con encabezado y pie de página
const doc = new Document({
  sections: [
    {
      properties: {},
      headers: {
        default: header,
      },
      footers: {
        default: footer,
      },
      children: [
        new Paragraph({
          children: [
            new TextRun("Contenido del documento"),
          ],
        }),
      ],
    },
  ],
});

// Used to export the file into a .docx file
Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
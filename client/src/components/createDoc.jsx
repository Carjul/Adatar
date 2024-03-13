 
import { Document, Packer, Paragraph, TextRun, ImageRun,Header,Footer } from "docx";
import React, { useState } from "react";
import { saveAs} from 'file-saver';

function DocxGenerator() {
  const [imageData, setImageData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageData(event.target.result);
    };

    reader.readAsArrayBuffer(file);
  };
function generateDocument() {

  const image = new ImageRun({
    type: 'png',
    data: imageData,
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


    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "example.docx");
    }).catch(error => {
      console.error('Error creating document:', error);
    });
 
  }
  return (
    <div>
    
      <button type="button" onClick={generateDocument}>Click to generate document</button>
      <input type="hidden" onChange={handleFileChange} accept="image/*" />
    </div>
  );
}

export default DocxGenerator;

const path = require("path");
const { patchDocument, PatchType, TextRun, Paragraph, ImageRun, Table, TableRow, TableCell, VerticalAlign, AlignmentType, ShadingType, TextDirection, HeadingLevel, WidthType, PageBreak } = require("docx");

const { readFileSync, writeFileSync, unlink } = require('fs');

// Función que genera el documento


const func = async ({ Periodo, Estudiantes, ImagenBar, ImagenPie }) => {
  var tableData = [];

  tableData.push([
    "Nombres",
    "Perdió",
    "Ganó",
    "C. Materias",
    "% de Perdida"
  ]);

  for (let i = 0; i < Estudiantes.length; i++) {
    const estudiante = Estudiantes[i];
    const rowData = [
      estudiante.nombres,
      estudiante.perdio.toString(),
      estudiante.gano.toString(),
      estudiante.cantidad_materias.toString(),
      estudiante.porcentaje_perdida.toString() + "%"
    ];
    tableData.push(rowData);
  }

  const table = new Table({
    columnWidths: [4000, 1000, 1000, 1000, 1000],
    rows: tableData.map((row, rowIndex) => new TableRow({
      children: row.map(cellData => new TableCell({
        width: {
          size: 3545,
          type: WidthType.DXA
        },
        children: [new Paragraph({
          children: [new TextRun({
            text: cellData,
            bold: rowIndex === 0, // Bold para la primera fila (encabezado)
            color: rowIndex === 0 ? "#FFFFFF" : "#000000",
            size: 22,
            font: "Calibri"
          })],
          alignment: AlignmentType.CENTER
        })],
        margins: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        verticalAlign: "center",
        shading: {
          type: ShadingType.CLEAR,
          color: "auto",
          fill: rowIndex === 0 ? "227C08" : "BEF1B5" // Verde fuerte para el encabezado, verde viche para el cuerpo
        }
      }))
    }))
  });


return patchDocument(readFileSync(path.resolve(__dirname, "./Plantilla.docx")), {
  patches: {
    titulo: {
      type: PatchType.PARAGRAPH,
      children: [new TextRun({
        text: Periodo,
        color: '#3CAFD1',
        bold: true,
        size: 28,
        font: 'Arial',
        verticalAlign: VerticalAlign.CENTER
      })],
    },
    titulo2: {
      type: PatchType.PARAGRAPH,
      children: [
        new TextRun({
          text: "Porcentaje de Notas por Rango",
          color: '#000000',
          bold: false,
          size: 24,
          font: 'Arial',
          verticalAlign: VerticalAlign.CENTER

        }),]
    }, 
    imagepie: {
      type: PatchType.PARAGRAPH,
      children: [

        new ImageRun({
          type: "png",
          data: readFileSync(ImagenPie + ".png"),
          transformation: { width: 600, height: 420 },
        }),
        new PageBreak()

      ],
    },

     titulo3: {
      type: PatchType.PARAGRAPH,
      children: [
        new TextRun({
          text: "Estudiantes por curso, promedio de notas, cantidad que perdieron y ganaron",
          color: '#000000',
          bold: false,
          size: 24,
          font: 'Arial',
          verticalAlign: VerticalAlign.CENTER

        }),]
    }, 
    imagebar: {
      type: PatchType.PARAGRAPH,
      children: [
        new ImageRun({
          type: "png",
          data: readFileSync(ImagenBar + ".png"),
          transformation: { width: 600, height: 500 },
        }),
        new PageBreak()
      ],
    },
    titulo4: {
      type: PatchType.PARAGRAPH,
      children: [
        new TextRun({
          text: "Tabla Porcentaje de Perdida",
          color: '#000000',
          bold: false,
          size: 24,
          font: 'Arial',
          verticalAlign: VerticalAlign.CENTER

        }),
      ]

    }, 
    table: {
      type: PatchType.DOCUMENT,
      children: [
        table
      ],
    },
  },
})
};



function guardarImagenDesdeBase64(base64String, filename) {

  const base64Data = base64String.split(';base64,').pop();

  const buffer = Buffer.from(base64Data, 'base64');

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



  try {


    const doc = await func({ Periodo: obj.periodo_academico, Estudiantes: obj.Estudiantes, ImagenBar: savePathBar, ImagenPie: savePathPie });

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
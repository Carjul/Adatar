
const fs = require("fs");
const path = require("path");
const {
    ExternalHyperlink,
    ImageRun,
    Paragraph,
    patchDocument,
    PatchType,
    TextRun,
    Table, TableRow, TableCell
} = require("docx");

const CreateDocx = (obj) => {
    const filePath = path.join(__dirname, 'Plantilla.docx');
    

const base64Data = obj.ImagenPie.split(',')[1];

// Decodificar la cadena base64 en datos binarios
const svgBuffer = Buffer.from(base64Data, 'base64');

// Especificar la ruta de archivo para guardar el archivo SVG
const filePath3 = 'imagen_pie.svg';

// Escribir los datos binarios en un archivo SVG
fs.writeFileSync(filePath3, svgBuffer);
    /* const imagenPie = obj.ImagenPie;
    const imagenBar = obj.ImagenBar; */

    // Crear una tabla con la información de estudiantes
 /*    const table = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph("Nombres")] }),
                    new TableCell({ children: [new Paragraph("Perdio")] }),
                    new TableCell({ children: [new Paragraph("Gano")] }),
                    new TableCell({ children: [new Paragraph("Cantidad Materias")] }),
                    new TableCell({ children: [new Paragraph("Porcentaje Perdida")] }),
                ],
            }),
           obj.Estudiantes.map(estudiante => {
                return new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(estudiante.nombres)] }),
                        new TableCell({ children: [new Paragraph(estudiante.perdio.toString())] }),
                        new TableCell({ children: [new Paragraph(estudiante.gano.toString())] }),
                        new TableCell({ children: [new Paragraph(estudiante.cantidad_materias.toString())] }),
                        new TableCell({ children: [new Paragraph(estudiante.porcentaje_perdida.toString())] }),
                    ],
                });
            })
        ]
    }); */
    patchDocument(fs.readFileSync(filePath), {
        patches: {
            first_name: {
                type: PatchType.PARAGRAPH,
                children: [
                    new TextRun("#657"),
                   new ImageRun({
                        type: "svg",
                        data: filePath3,
                        transformation: { width: 100, height: 100 },
                    }), 
                ],
            },

            phone: {
                type: PatchType.PARAGRAPH,
                children: [
                    new Paragraph("Another paragraph"),
                    new Paragraph("Imagen Bar:"),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Imagen Bar",
                            }),
                            new TextRun({
                                break: 1,
                            }),
                           
                        ],
                    }),
                      new ImageRun({
                        type: "svg",
                        data: imagenBar,
                        transformation: { width: 100, height: 100 },
                    }), 
                ],

            },

            description: {
                type: PatchType.DOCUMENT,
                children: [
                    new Paragraph("Lorem ipsum paragraph"),
                    new Paragraph("Another paragraph"),
            
                ],
            },
        },
    }).then((doc) => {
        fs.writeFileSync(path.join(__dirname, "../public/Informe.docx"), doc);
    });


}
const obj = {
    "periodo_academico": "",
    "ImagenPie": "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22782%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20viewBox%3D%220%200%20782%20600%22%3E%0A%0A%3C%2Fsvg%3E",
    "ImagenBar": "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22782%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20viewBox%3D%220%200%20782%20600%22%3E%0A%0A%3C%2Fsvg%3E",
    "Estudiantes": [
        {
            "identificacion": "1067965069",
            "nombres": "JOSE RAUL CASTRO FLOREZ",
            "perdio": 4,
            "gano": 0,
            "cantidad_materias": 4,
            "porcentaje_perdida": 100
        },
        {
            "identificacion": "1003393670",
            "nombres": "CRISTIAN MIGUEL CAUSIL QUINTERO",
            "perdio": 1,
            "gano": 1,
            "cantidad_materias": 2,
            "porcentaje_perdida": 50
        },
        {
            "identificacion": "1003310490",
            "nombres": "RICHARD DAVID CAMARGO VELLOJIN",
            "perdio": 2,
            "gano": 2,
            "cantidad_materias": 4,
            "porcentaje_perdida": 50
        },
        {
            "identificacion": "1066753890",
            "nombres": "ADOLFO ANDRES NAVARRO CASTRO",
            "perdio": 1,
            "gano": 1,
            "cantidad_materias": 2,
            "porcentaje_perdida": 50
        },
        {
            "identificacion": "1003465728",
            "nombres": "KEVIN ENRIQUE NEGRETE MARTINEZ",
            "perdio": 1,
            "gano": 2,
            "cantidad_materias": 3,
            "porcentaje_perdida": 33
        },
        {
            "identificacion": "1065013346",
            "nombres": "YENY SOFIA MIRANDA OSTEN",
            "perdio": 0,
            "gano": 1,
            "cantidad_materias": 1,
            "porcentaje_perdida": 0
        },
        {
            "identificacion": "1233341108",
            "nombres": "ANDRES FELIPE VERGARA RODRIGUEZ",
            "perdio": 0,
            "gano": 1,
            "cantidad_materias": 1,
            "porcentaje_perdida": 0
        }
    ]
};

CreateDocx(obj);
module.exports = { CreateDocx }


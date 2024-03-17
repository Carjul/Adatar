
const fs = require("fs");
const path = require("path");
const {
    ExternalHyperlink,
    ImageRun,
    Paragraph,
    patchDocument,
    PatchType,
    TextRun,
} = require("docx");

const CreateDocx = (app) => {
    console.log("Documento creado", app)
    const filePath = path.join(__dirname, 'Plantilla.docx');
    patchDocument(fs.readFileSync(filePath), {
        patches: {
            first_name: {
                type: PatchType.PARAGRAPH,
                children: [
                    new TextRun("#657"),
                    new ExternalHyperlink({
                        children: [
                            new TextRun({
                                text: "BBC News Link",
                            }),
                        ],
                        link: "https://www.bbc.co.uk/news",
                    }),
                ],
            },

            phone: {
                type: PatchType.PARAGRAPH,
                children: [
                    new Paragraph("Another paragraph"),
                     new ImageRun({
                        type: "png",
                        data: fs.readFileSync(__dirname + '/Imagen2.png'),
                        transformation: { width: 100, height: 100 },
                    }), 
                ],
            },

            description: {
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

                        ],
                    }),
                ],
            },
        },
    }).then((doc) => {
        fs.writeFileSync(path.join(__dirname, "../public/Informe.docx"), doc);
    });
   

}

module.exports = { CreateDocx }


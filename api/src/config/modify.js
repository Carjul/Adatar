
const fs = require("fs");
const {
    ExternalHyperlink,
    ImageRun,
    Paragraph,
    patchDocument,
    PatchType,
    TextRun,
} = require("docx");



patchDocument(fs.readFileSync("/workspaces/Adatar/api/src/config/Plantilla.docx"), {
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
                /* new ImageRun({
                    type: "png",
                    data: fs.readFileSync(__dirname + '/Imagen2.png'),
                    transformation: { width: 100, height: 100 },
                }), */
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
    fs.writeFileSync("../public/Informe.docx", doc);
});
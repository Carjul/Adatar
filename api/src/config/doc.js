const ImageModule = require("docxtemplater-image-module");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const PizZip = require("pizzip");
const path = require("path");

const imageOptions = {
    centered: false,
    getImage(tagValue, tagName, meta) {
        console.log({ tagValue, tagName, meta });
        return fs.readFileSync(tagValue);
    },
    getSize() {
        // it also is possible to return a size in centimeters, like this : return [ "2cm", "3cm" ];
        return [150, 150];
    },
};
const content = fs.readFileSync(
    path.resolve(__dirname, "Plantilla.docx"),
    "binary"
);
const zip = new PizZip(content);
const doc = new Docxtemplater(zip, {
    modules: [new ImageModule(imageOptions)],
});
doc.render({ image: "descarga.png" });

const buffer = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
});

fs.writeFile("test.docx", buffer);
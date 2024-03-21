const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const ImageModule = require('docxtemplater-image-module-free');



const imageOptionls = {
  async CrearSvgFile(svgStrin, filePath){
      await  fs.writeFileSync(filePath,svgStrin)
    }
};
  


const CreateDoxc = (obj) => {
  

const savePathPie = './data/imagenpie.svg';
const savePathBar = './data/imagenbar.svg';

imageOptionls.CrearSvgFile(obj.ImagenPie,path.join(__dirname, savePathPie))
imageOptionls.CrearSvgFile(obj.ImagenBar,path.join(__dirname, savePathBar))


  const content = fs.readFileSync(
    path.resolve(__dirname, "Plantilla.docx"),
    "binary"
  );


  const zip = new PizZip(content);


 const imageOptions = {
    centered: false,
    getImage(tagValue, tagName, meta) {
        return fs.readFileSync(path.join(__dirname,tagValue));
    },
    getSize() {
        return [600, 500];

    },
};
  
  const doc = new Docxtemplater(zip, {
    modules: [new ImageModule(imageOptions)],
    paragraphLoop: true,
    linebreaks: true,
});
doc.render({
    first_name: "John",
    last_name: "Doe",
    phone: "0652455478",
    description: "New Website2",
    image:savePathBar,
    imagen:savePathPie,

});


  const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });


  fs.writeFileSync(path.resolve(__dirname, "../public/Reporte.docx"), buf);
  fs.unlink(path.join(__dirname, savePathPie), (err) => {
    if (err) throw err;
  });
  fs.unlink(path.join(__dirname, savePathBar), (err) => {
    if (err) throw err;
  });


}



module.exports = { CreateDoxc }
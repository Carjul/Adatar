const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const ImageModule = require('docxtemplater-image-module-free');
const svg2png = require('svg2png');

let x = '';
function svgToPngBase64(svgString) {
  return new Promise((resolve, reject) => {
    svg2png(svgString, { width: 778, height: 600 })
      .then((buffer) => {
        const base64Data = Buffer.from(buffer).toString('base64');
        const pngData = `data:image/png;base64,${base64Data}`;
        resolve(pngData);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// Example usage
const svgString = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" width="778" height="600" style="position: absolute; left: 0px; top: 0px; user-select: none;"><rect width="778" height="600" x="0" y="0" fill="none"></rect><g><path d="M311.5 48L311.5 540" fill="transparent" stroke="#E0E6F1"></path><path d="M424.4781 48L424.4781 540" fill="transparent" stroke="#E0E6F1"></path><path d="M537.4561 48L537.4561 540" fill="transparent" stroke="#E0E6F1"></path><path d="M649.4361 48L649.4361 540" fill="transparent" stroke="#E0E6F1"></path><path d="M762.4142 48L762.4142 540" fill="transparent" stroke="#E0E6F1"></path><path d="M762.5 48L762.5 540" fill="transparent" stroke="#E0E6F1"></path><path d="M311.5 540L311.5 48" fill="transparent" stroke="#6E7079" stroke-linecap="round"></path><path d="M311.2 540.5L306.2 540.5" fill="transparent" stroke="#6E7079"></path><path d="M311.2 469.4733L306.2 469.4733" fill="transparent" stroke="#6E7079"></path><path d="M311.2 399.4466L306.2 399.4466" fill="transparent" stroke="#6E7079"></path><path d="M311.2 329.4199L306.2 329.4199" fill="transparent" stroke="#6E7079"></path><path d="M311.2 259.3923L306.2 259.3923" fill="transparent" stroke="#6E7079"></path><path d="M311.2 48.5L306.2 48.5" fill="transparent" stroke="#6E7079"></path><text dominant-baseline="central" text-anchor="end" xml:space="preserve" transform="translate(294.2 504.8437)" fill="#6E7079" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">DISEÑO Y DESARROLLO D SOFT EDUCATIVO III</text><text dominant-baseline="central" text-anchor="end" xml:space="preserve" transform="translate(294.2 434.5312)" fill="#6E7079" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">PRACTICA DOCENTE II</text><text dominant-baseline="central" text-anchor="end" xml:space="preserve" transform="translate(294.2 364.2187)" fill="#6E7079" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">ELABORAC Y SUSTENTACION DE INFORME FINAL</text><text dominant-baseline="central" text-anchor="end" xml:space="preserve" transform="translate(294.2 293.9062)" fill="#6E7079" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">ESTANDARES DE NORMAS DE CALIDAD</text><text dominant-baseline="central" text-anchor="end" xml:space="preserve" transform="translate(294.2 223.5937)" fill="#6E7079" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">VIDEO JUEGOS EDUCATIVOS</text><text dominant-baseline="central" text-anchor="middle" y="6" transform="translate(311.2 548)" fill="#6E7079" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">0</text><text dominant-baseline="central" text-anchor="middle" y="6" transform="translate(423.9885 548)" fill="#6E7079" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">10</text><text dominant-baseline="central" text-anchor="middle" y="6" transform="translate(536.777 548)" fill="#6E7079" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">20</text><text dominant-baseline="central" text-anchor="middle" y="6" transform="translate(649.5655 548)" fill="#6E7079" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">30</text><text dominant-baseline="central" text-anchor="middle" y="6" transform="translate(762.354 548)" fill="#6E7079" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">40</text><text dominant-baseline="central" text-anchor="middle" y="6" transform="translate(762.44 548)" fill="#6E7079" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">50</text><path d="M311.2 480.5859l0.1377 0l0 48.5156l-0.1377 0Z" fill="#5470c6"></path><path d="M311.2 410.2734l11.2788 0l0 48.5156l-11.2788 0Z" fill="#5470c6"></path><path d="M311.2 269.7422l0.1377 0l0 48.5156l-0.1377 0Z" fill="#5470c6"></path><path d="M311.2 199.4297l11.2702 0l0 48.5156l-11.2702 0Z" fill="#5470c6"></path><path d="M311.2 129.1172l0.0774 0l0 48.5156l-0.0774 0Z" fill="#5470c6"></path><path d="M311.2 340.0371l0 0l0 48.4971l0 0Z" fill="#5470c6" fill-opacity="0.6033511249999999"></path><path d="M311.2 58.8943l0 0l0 48.4971l0 0Z" fill="#5470c6" fill-opacity="0.6033511249999999"></path><path d="M311.3377 480.5859l428.4758 0l0 48.5156l-428.4758 0Z" fill="#91cc75"></path><path d="M322.4788 410.2734l394.8027 0l0 48.5156l-394.8027 0Z" fill="#91cc75"></path><path d="M311.3377 269.7422l203.0967 0l0 48.5156l-203.0967 0Z" fill="#91cc75"></path><path d="M322.4702 199.4297l338.288 0l0 48.5156l-338.288 0Z" fill="#91cc75"></path><path d="M311.2774 129.1172l169.0623 0l0 48.5156l-169.0623 0Z" fill="#91cc75"></path><path d="M311.2 340.0371l214.339 0l0 48.4971l-214.339 0Z" fill="#91cc75" fill-opacity="0.6033511249999999"></path><path d="M311.2 58.8943l22.562 0l0 48.4971l-22.562 0Z" fill="#91cc75" fill-opacity="0.6033511249999999"></path><text dominant-baseline="central" text-anchor="middle" transform="translate(311.2688 504.8437)" fill="#eee" stroke="#5470c6" stroke-width="2" paint-order="stroke" stroke-miterlimit="2" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">16</text><text dominant-baseline="central" text-anchor="middle" transform="translate(316.8394 434.5312)" fill="#eee" stroke="#5470c6" stroke-width="2" paint-order="stroke" stroke-miterlimit="2" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">1</text><text dominant-baseline="central" text-anchor="middle" transform="translate(311.2688 294)" fill="#eee" stroke="#5470c6" stroke-width="2" paint-order="stroke" stroke-miterlimit="2" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">16</text><text dominant-baseline="central" text-anchor="middle" transform="translate(316.8351 223.6875)" fill="#eee" stroke="#5470c6" stroke-width="2" paint-order="stroke" stroke-miterlimit="2" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">0</text><text dominant-baseline="central" text-anchor="middle" transform="translate(311.2387 153.375)" fill="#eee" stroke="#5470c6" stroke-width="2" paint-order="stroke" stroke-miterlimit="2" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">9</text><text dominant-baseline="central" text-anchor="middle" transform="translate(525.5756 504.8437)" fill="#333" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">24</text><text dominant-baseline="central" text-anchor="middle" transform="translate(519.8802 434.5312)" fill="#333" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">40</text><text dominant-baseline="central" text-anchor="middle" transform="translate(412.886 294)" fill="#333" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">27</text><text dominant-baseline="central" text-anchor="middle" transform="translate(491.6143 223.6875)" fill="#333" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">21</text><text dominant-baseline="central" text-anchor="middle" transform="translate(395.8086 153.375)" fill="#333" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">1</text><path d="M-5 -5l187 0l0 24l-187 0Z" transform="translate(300.5 587)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0"></path><path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(300.5 587)" fill="#91cc75"></path><text dominant-baseline="central" text-anchor="start" x="30" y="7" transform="translate(300.5 587)" fill="#333" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">Ganaron</text><path d="M0 0l80 0l0 14l-80 0Z" transform="translate(300.5 587)" fill="transparent"></path><path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(390.5 587)" fill="#5470c6"></path><text dominant-baseline="central" text-anchor="start" x="30" y="7" transform="translate(390.5 587)" fill="#333" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;;">Perdieron</text><path d="M0 0l87 0l0 14l-87 0Z" transform="translate(390.5 587)" fill="transparent"></path><path d="M-15 -15l106.9212 0l0 30l-106.9212 0Z" transform="translate(686.0788 15)" fill="transparent" stroke="#ccc" stroke-width="0"></path><path d="M-158.5 -5l317 0l0 28l-317 0Z" transform="translate(389 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0"></path><path d="M-7.5 -1.036L-5.428 -1.036L-2.714 -7.4562L-0.5545 3.6333L2.2763 -2.1158L3.1518 1.6196L7.5 1.6196M-7.5 7.4562L7.5 7.4562" transform="translate(686.0788 15)" fill="transparent" stroke="#666"></path><path d="M-6.2277 -1.9018L-3.5491 -1.9018L-3.5491 4.8214L-6.2277 4.8214L-6.2277 -1.9018ZM-1.3527 -4.5536L1.3259 -4.5536L1.3259 4.8214L-1.3527 4.8214L-1.3527 -4.5536ZM3.5491 -7.5L6.2277 -7.5L6.2277 4.8214L3.5491 4.8214L3.5491 -7.5ZM-7.192 7.5L7.192 7.5" transform="translate(713.7708 15)" fill="transparent" stroke="#666"></path><path d="M-3.683 -3.4018L0.4688 -3.4018M-3.683 -3.4018L0.4688 -3.4018M3.7902 -0.1339L-3.7098 -0.1339M-5.2902 -7.5L-5.2902 7.5L5.2902 7.5L5.2902 -4.0714L1.9152 -7.5L-5.2902 -7.5ZM1.9152 -7.4464L1.9152 -4.0446L5.2902 -4.0446M3.7902 3.1339L-3.7098 3.1339" transform="translate(739.2529 15)" fill="transparent" stroke="#666"></path><path d="M-6.4526 -1.5776L-0.0905 4.2672L6.4784 -1.4483M-6.4784 3.7759L-6.4784 7.5L6.2457 7.5L6.2457 3.7759M-0.1164 4.1638L-0.1164 -7.5" transform="translate(764.0216 15)" fill="transparent" stroke="#666"></path><text dominant-baseline="central" text-anchor="middle" xml:space="preserve" y="9" transform="translate(389 5)" fill="#464646" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; font-weight: bold;">Materias Por Semestre Académico</text></g></svg>`;

svgToPngBase64(svgString)
  .then((pngData) => {
    
     x = pngData
    // You can use the pngData URI to display the image in an HTML img tag
  })
  .catch((err) => {
    console.error('Error al convertir SVG en PNG:', err);
  });

function base64DataURLToArrayBuffer(dataURL) {
    const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
    if (!base64Regex.test(dataURL)) {
      return false;
    }
    const stringBase64 = dataURL.replace(base64Regex, "");
    let binaryString;
    if (typeof window !== "undefined") {
      binaryString = window.atob(stringBase64);
    } else {
      binaryString = new Buffer(stringBase64, "base64").toString("binary");
    }
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes.buffer;
  }



const CreateDoxc = (y) => {
// Load the docx file as binary content
const content = fs.readFileSync(
    path.resolve(__dirname, "Plantilla.docx"),
    "binary"
);


const zip = new PizZip(content);

const imageOptions = {
    getImage(tag) {
      return base64DataURLToArrayBuffer(tag);
    },
    getSize() {
      return [100, 100];
    },
  } ;

/* const imageOptions = {
    centered: false,
    getImage(tagValue, tagName, meta) {
        console.log({ tagValue, tagName, meta });
        return fs.readFileSync(tagValue);
    },
    getSize() {
        // it also is possible to return a size in centimeters, like this : return [ "2cm", "3cm" ];
        return [150, 150];
    },
} */
const doc = new Docxtemplater(zip, {
    modules: [new ImageModule(imageOptions)],
    paragraphLoop: true,
    linebreaks: true,
});

// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
 doc.render({
    first_name: "John",
    last_name: "Doe",
    phone: "0652455478",
    image: y,
    description: "New Website",
});


const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
});


fs.writeFileSync(path.resolve(__dirname, "../public/Reporte.docx"), buf);

}



module.exports = { CreateDoxc}
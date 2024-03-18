import React, { Component } from "react";

import { saveAs } from "file-saver";
import { Document, ImageRun, Packer, Paragraph } from "docx";


class AppDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React"
    };

  }

 async generate() {
  const response = await fetch(obj.ImagenPie);
      const blob = await response.blob();

  const doc = new Document({
       sections: [
         {
           children: [
             new Paragraph("Hello World"),
             new Paragraph({
               children: [
                 new ImageRun({
                  
                   data: blob,
                   transformation: {
                     width: 200,
                     height: 100
                   }
                 })
               ]
             })
           ]
         }
       ]
     });
 
     Packer.toBlob(doc).then(blob => {
       console.log(blob);
       saveAs(blob, "example.docx");
       console.log("Document created successfully");
     }); 
  }

  async generateFromUrl() {
    const blob = await fetch(
      "https://raw.githubusercontent.com/dolanmiu/docx/master/demo/images/cat.jpg"
    ).then(r => r.blob());

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph("Hello World"),
            new Paragraph({
              children: [
                new ImageRun({
                  data: blob,
                  transformation: {
                    width: 100,
                    height: 100
                  }
                })
              ]
            })
          ]
        }
      ]
    });

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }

  render() {
    return (
      <div>
        <p className="flex flex-col flex-wrap">
          Start editing to see some magic happen
          <button onClick={this.generate} className="btn btn-danger" >
            Generate  base64
          </button>
          <button onClick={this.generateFromUrl} className="btn btn-danger">
            Generate image
          </button>
        </p>
      </div>
    );
  }
}
const obj = {
  periodo_academico: "",
  ImagenPie: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22782%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20viewBox%3D%220%200%20782%20600%22%3E%0A%0A%3C%2Fsvg%3E",
  ImagenBar: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22782%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20viewBox%3D%220%200%20782%20600%22%3E%0A%0A%3C%2Fsvg%3E",
  Estudiantes: [
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

export default AppDoc;


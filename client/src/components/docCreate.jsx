import React from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import expressionParser from 'docxtemplater/expressions';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

const AppDoc = () => {
  const generateDocument = () => {
    loadFile(
      'https://docxtemplater.com/ang-example.docx',
      function (error, content) {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          parser: expressionParser,
        });
    
        doc.render({
          first_name: 'John',
          last_name: 'Doe',
          last_name2: 'Does',
          organization: {
            companyName: 'Foobar',
          },
          phone: '0652455478',
          description: 'New Website',
        });
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }); //Output the document using Data-URI
        saveAs(out, 'output.docx');
      }
    );
  };

  return (
    <div className="p-2">
      
      <button onClick={generateDocument}>Generate document</button>
   
   
    </div>
  );
};

export default AppDoc;
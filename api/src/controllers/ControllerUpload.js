const XLSX = require("xlsx");
const fs = require('fs-extra')

const createprograma = require("../services/creasteprograma");
const crearfacultad = require("../services/createfacultad");
const createpemsun = require("../services/cretepemsun");
const createMaterias = require("../services/createmateria");

 const data = new Array()
 const UploadFile= async(req,res)=>{
    try {
    const {path}=req.file;
    
    const excel = XLSX.readFile(path);

    var nombreHoja = excel.SheetNames

    
         let facultad = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[3]]);
         const f= crearfacultad(facultad);
        console.log(f);
         
        let programs = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[4]]);
        const p= createprograma(programs) 
        console.log(p)
       
        let pensums = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[5]])
        const pe= createpemsun(pensums)
        console.log(pe)

        let materias = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[2]])
        const m= createMaterias(materias)
        console.log(m)


    await fs.unlink(path);
    res.status(201).json({msg:"recivido"})
    
    } catch (error) {
        res.status(201).json(error)
    }
}

module.exports={
    UploadFile
}
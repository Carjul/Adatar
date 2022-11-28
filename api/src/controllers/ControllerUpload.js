const XLSX = require("xlsx");
const fs = require('fs-extra')
const {Facultades,Programas} = require('../db')

 const data = new Array()
 const UploadFile= async(req,res)=>{
    try {
    const {path}=req.file;
    
    const excel = XLSX.readFile(path);

    var nombreHoja = excel.SheetNames

    
        let facultad = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[3]]);
        facultad.map(  e=> Facultades.create(e)
        .then((e)=>{console.log(e);})
        .catch(err=> console.log(err)))  

        let programs = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[4]]);
        programs.map( async (e)=>{ 
            await Programas.create({
                Programa_id:e.Programa_id,
                Programa:e.Programa,
                NombreCorto:e.NombreCorto,
                NombreMuyCorto:e.NombreMuyCorto,
                FacultadeFacultadId:e.Facultad_id
            }).catch(err=> console.log(err))
        })
    
    await fs.unlink(path)
    console.log(programs); 
    console.log( nombreHoja[4]);
    res.status(201).json({msg:"recivido"})
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    UploadFile
}
const XLSX = require("xlsx");
const fs = require('fs-extra')
const {Facultades,Programas,Pensums} = require('../db')

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
         programs.map(  (e)=>{ 
              Programas.create({
                 Programa_id:e.Programa_id,
                 Programa:e.Programa,
                 NombreCorto:e.NombreCorto,
                 NombreMuyCorto:e.NombreMuyCorto,
                 FacultadeFacultadId:e.Facultad_id
             })
             .then((e)=>{console.log(e);})
             .catch(err=> console.log(err))
        }) 
        
       
        let pensums = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[5]])
        pensums.map(e=>
            Pensums.create({
                Pensum_id:e.Pensum_id, 
                Pensum:e.Pensum , 
                Sesion:e.Sesion,
                ProgramaProgramaId:e.Programa_id,
            }).then((e)=>{console.log(e);})
            .catch(err=> console.log(err))
        )

       // let materias = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[2]])

    await fs.unlink(path)
    console.log(pensums);
    console.log( nombreHoja[5]);
    res.status(201).json({msg:"recivido"})
    } catch (error) {
        res.status(201).json(error)
    }
}

module.exports={
    UploadFile
}
const XLSX = require("xlsx");
const fs = require('fs-extra')

 const data = new Array()
 const UploadFile= async(req,res)=>{
    try {
    const {path}=req.file;
    
    const excel = XLSX.readFile(path);

    var nombreHoja = excel.SheetNames

    nombreHoja?.map((e)=> {
        let datos = XLSX.utils.sheet_to_json(excel.Sheets[e]);
        data.push(datos)
    })
    await fs.unlink(path)
    console.log(data); 
    res.status(201).json({msg:"recivido"})
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    UploadFile
}
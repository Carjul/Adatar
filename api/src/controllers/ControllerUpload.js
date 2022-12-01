const XLSX = require("xlsx");
const fs = require('fs-extra')

const createprograma = require("../services/creasteprograma");
const crearfacultad = require("../services/createfacultad");
const createpemsun = require("../services/cretepemsun");
const createMaterias = require("../services/createmateria");

const data = new Array()
const UploadFile = async (req, res) => {
    try {
        const { path } = req.file;

        //leer excel
        const excel = XLSX.readFile(path);
        //obtener nombre de las hoja
        const hoja = excel.SheetNames[0];
        //convertir hoja a json
        let reporte = XLSX.utils.sheet_to_json(excel.Sheets[hoja]);
        //console.log(reporte);

        var facultad = reporte.map(e => {
            return { NombreFacultad: e.Facultad }
        })
        let hash = {};
        array = facultad.filter(o => hash[o.NombreFacultad] ? false : hash[o.NombreFacultad] = true);
        const facultadcreada = await crearfacultad(array)
        console.log(facultadcreada)


        var programas = reporte.map(e => {
            return { NombrePrograma: e.ProgramaEstudiante, Sede: e.sede, Sesion: e.Sesion,NombreFacultad: e.Facultad }
        })
       const p= eliminaDuplicados(programas)
       console.log(p);

       // const programaCreado = await createprograma(unicos)
        // let pensums = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[5]])
        // const pe= createpemsun(pensums)
        // console.log(pe)

        // let materias = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[2]])
        // const m= createMaterias(materias)
        // console.log(m)
        //let estudiantes = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]])
        //console.log(estudiantes[0])


        res.status(201).json({ msg: "recivido" })

    } catch (error) {
        res.status(201).json(error)
    }
}


const eliminaDuplicados = (arr) => {
  
    const arrMap = arr.map(elemento => {
      return [JSON.stringify(elemento), elemento]
    });
  
    return [...new Map(arrMap).values()];
  }
module.exports = {
    UploadFile
}
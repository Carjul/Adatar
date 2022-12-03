const XLSX = require("xlsx");
const fs = require('fs-extra')

const createprograma = require("../services/creasteprograma");
const crearfacultad = require("../services/createfacultad");
const createpemsun = require("../services/cretepemsun");
const createMaterias = require("../services/createmateria");
const crearstudent = require("../services/createstudiante");

const data = new Array()
const UploadFile =async(req, res) => {
    try {
        const { path } = req.file;

        //leer excel
        const excel = XLSX.readFile(path);
        //obtener nombre de las hoja
        const hoja = excel.SheetNames[0];
        //convertir hoja a json
        let reporte = XLSX.utils.sheet_to_json(excel.Sheets[hoja]);
      

        var facultad = reporte.map(e => {return { NombreFacultad: e.Facultad } })
        var facultadrepetida= eliminaDuplicados(facultad)
        const facultadcreada = await crearfacultad(facultadrepetida)
        console.log(facultadcreada)

        

        var programas = reporte.map(e => {return { NombrePrograma: e.ProgramaEstudiante, 
            Sede: e.sede, 
            Sesion: e.Sesion,
            NombreFacultad: e.Facultad } })
        var programarepetida= eliminaDuplicados(programas)
        const programacredo = await createprograma(programarepetida)
        console.log(programacredo)


        var pensum = reporte.map(e => {return { 
            Pensum: e.ProgramaMateria, 
            Semestres: e.SemMateriaNum, 
            NombrePrograma: e.ProgramaEstudiante, 
            Sede: e.sede, } })
        var pensumrepetida= eliminaDuplicados(pensum)
        const pensumcreado= await createpemsun(pensumrepetida)
        console.log(pensumcreado)


        var estudiante = reporte.map(e => {return {
            id:e.people_code_id,
            TipoDoc:e.TipoDoc,
            Identificacion:e.Identificacion,
            Nombres:e.Nombres,
            EstadoAlumnoPrograma:e.EstadoAlumnoPrograma,
            Semestre:e.Semestre,
            Direccion:e.DIRECCION,
            Ciudad:e.CIUDAD,
            Departamento:e.DEPARTAMENTO,
            TelFijo:e.TelFijo,
            TelMovil:e.TelMovil,
            Email:e.EMAIL,
            Genero:e.Genero,
            SemeNumero:e.SemMateriaNum,
            Pensum: e.ProgramaMateria, 
            Semestres: e.SemMateriaNum, } })
        const estudiantecreado= await crearstudent(estudiante)
        console.log(estudiantecreado) 


        var materias = reporte.map(e => {return { 
            NombreMateria: e.NombreMateria, 
            CodigoMateria: e.CodigoMateria, 
            Seccion:e.Seccion,
            TipoMateria:e.TipoMateria, } })
        const materiasduplicado = eliminaDuplicados(materias)
       const materiascreado = await createMaterias(materiasduplicado)
        console.log(materiascreado)
         

     await fs.unlink(path);
     res.status(201).json({  message: "database initialize" });

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
const XLSX = require("xlsx");
const fs = require('fs-extra');
const path = require('path');

const createprograma = require("../services/creasteprograma");
const crearfacultad = require("../services/createfacultad");
const createpemsun = require("../services/cretepemsun");
const createMaterias = require("../services/createmateria");
const crearstudent = require("../services/createstudiante");
const createDocente = require("../services/createdocente");
const createPeriodoAcademico = require("../services/createperiodoacademico");
const createMateriaspensun = require("../services/createmateriasporpensum");
const createNotas = require("../services/createnotas");
 

const UploadFile = async (req, res) => {
  try {

    //leer excel
    const excel = XLSX.readFile(req.file.path);
    //obtener nombre de las hoja
    const hoja = excel.Sheets['Data'];
    
    //convertir hoja a json
    var reporte = XLSX.utils.sheet_to_json(hoja);

    //elimnar exel
    await fs.unlink(req.file.path);

    var facultad = []
    var programas = []
    var pensum = []
    var estudiante = []
    var materias = []
    var materiaPensum = []
    var docentes = []
    var periodo = []
    var nota = []

    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      facultad.push({ NombreFacultad: e.Facultad })
    }
    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      programas.push({
        NombrePrograma: e.ProgramaEstudiante,
        Sede: e.sede,
        Sesion: e.Sesion,
        NombreFacultad: e.Facultad
      })
    }
    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      pensum.push({
        Pensum: e.ProgramaMateria,
        Semestres: e.SemMateriaNum,
        NombrePrograma: e.ProgramaEstudiante,
        Sede: e.sede,
      })
    }
    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      estudiante.push({
        id: e.people_code_id,
        TipoDoc: e.TipoDoc,
        Identificacion: e.Identificacion,
        Nombres: e.Nombres,
        EstadoAlumnoPrograma: e.EstadoAlumnoPrograma,
        Semestre: e.Semestre,
        Direccion: e.DIRECCION,
        Ciudad: e.CIUDAD,
        Departamento: e.DEPARTAMENTO,
        TelFijo: e.TelFijo,
        TelMovil: e.TelMovil,
        Email: e.EMAIL,
        Genero: e.Genero,
        SemeNumero: e.SemMateriaNum,
        Pensum: e.ProgramaMateria,
        Semestres: e.SemMateriaNum,
      })
    }
    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      materias.push({
        NombreMateria: e.NombreMateria,
        CodigoMateria: e.CodigoMateria,
        TipoMateria: e.TipoMateria,
      })
    }
    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      materiaPensum.push({
        NombreMateria: e.NombreMateria,
        CodigoMateria: e.CodigoMateria,
        Pensum: e.ProgramaMateria,
        Semestres: e.SemMateriaNum,
        SemMateriaNum: e.SemMateriaNum,
        Seme: e.seme
      })
    }
    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      docentes.push({
        Cog_Docente: e.Cog_Docente,
        Nom_Docente: e.Nom_Docente,
      })
    }
    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      periodo.push({
        Periodo: e.Periodo,
        Año: e.año,
      })
    }
    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      nota.push({
        GRADE_ACTIVITY: e.GRADE_ACTIVITY,
        FINAL_GRADE: e.FINAL_GRADE,
        Nota: e.Nota1 || e.nota2,
        Gano: e.Gano,
        Perdio: e.Perdio,
        Rango: e.Rango,
        ProxNotaMin: e.ProxNotaMin,
        Seccion: e.Seccion,
        NombrePrograma: e.ProgramaEstudiante,
        Sede: e.sede,
        NombreMateria: e.NombreMateria,
        CodigoMateria: e.CodigoMateria,
        Identificacion: e.Identificacion,
        Cog_Docente: e.Cog_Docente,
        Nom_Docente: e.Nom_Docente,
        Periodo: e.Periodo,
        Año: e.año,
      })
    }

    reporte=[]

    const facultadrepetida = eliminaDuplicados(facultad)
    facultad=[]
    const facultadcreada = await crearfacultad(facultadrepetida)
    console.log(facultadcreada)

    const programarepetida = eliminaDuplicados(programas)
    programas=[]
    const programacredo = await createprograma(programarepetida)
    console.log(programacredo)

    const pensumrepetida = eliminaDuplicados(pensum)
    pensum=[] 
    const pensumcreado = await createpemsun(pensumrepetida)
    console.log(pensumcreado)

    const estudiaterepetido = eliminaDuplicados(estudiante)
    estudiante=[]
    const estudiantecreado = await crearstudent(estudiaterepetido)
    console.log(estudiantecreado)

    const materiasduplicado = eliminaDuplicados(materias)
    materias=[]
    const materiascreado = await createMaterias(materiasduplicado)
    console.log(materiascreado)

    const materiaPensumduplicado = eliminaDuplicados(materiaPensum)
    materiaPensum=[]
    const materiaPensumcreado = await createMateriaspensun(materiaPensumduplicado)
    console.log(materiaPensumcreado)

    const docentesduplicado = eliminaDuplicados(docentes)
    docentes=[]
    const docentescreado = await createDocente(docentesduplicado)
    console.log(docentescreado)

    const periododuplicado = eliminaDuplicados(periodo)
    periodo=[]
    const periodocreado = await createPeriodoAcademico(periododuplicado)
    console.log(periodocreado)

    const createnotas = await createNotas(nota)
    nota=[]
    console.log(createnotas);
     

    res.json({ message: "database initialize" });
    

  } catch (error) {
    res.json(error)
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
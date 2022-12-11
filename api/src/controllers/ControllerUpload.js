const XLSX = require("xlsx");
const fs = require('fs-extra')

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
    const { path } = req.file;

    //leer excel
    const excel = XLSX.readFile(path);
    //obtener nombre de las hoja
    const hoja = excel.SheetNames[0];
    //convertir hoja a json
    let reporte = XLSX.utils.sheet_to_json(excel.Sheets[hoja]);
    //eliminar execel
    await fs.unlink(path);


    const facultad = []
    const programas = []
    const pensum = []
    const estudiante = []
    const materias = []
    const materiaPensum = []
    const docentes = []
    const periodo = []
    const nota = []

/* 
    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      facultad.push({ NombreFacultad: e.Facultad })
    }
    const facultadrepetida = eliminaDuplicados(facultad)
    const facultadcreada = await crearfacultad(facultadrepetida)
    console.log(facultadcreada)


    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      programas.push({
        NombrePrograma: e.ProgramaEstudiante,
        Sede: e.sede,
        Sesion: e.Sesion,
        NombreFacultad: e.Facultad
      })
    }
    const programarepetida = eliminaDuplicados(programas)
    const programacredo = await createprograma(programarepetida)
    console.log(programacredo)


    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      pensum.push({
        Pensum: e.ProgramaMateria,
        Semestres: e.SemMateriaNum,
        NombrePrograma: e.ProgramaEstudiante,
        Sede: e.sede,
      })
    }
    const pensumrepetida = eliminaDuplicados(pensum)
    const pensumcreado = await createpemsun(pensumrepetida)
    console.log(pensumcreado)


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
    const estudiaterepetido = eliminaDuplicados(estudiante)
    const estudiantecreado = await crearstudent(estudiaterepetido)
    console.log(estudiantecreado)


    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      materias.push({
        NombreMateria: e.NombreMateria,
        CodigoMateria: e.CodigoMateria,
        TipoMateria: e.TipoMateria,
      })
    }
    const materiasduplicado = eliminaDuplicados(materias)
    const materiascreado = await createMaterias(materiasduplicado)
    console.log(materiascreado)


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
    const materiaPensumduplicado = eliminaDuplicados(materiaPensum)
    const materiaPensumcreado = await createMateriaspensun(materiaPensumduplicado)
    console.log(materiaPensumcreado)


    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      docentes.push({
        Cog_Docente: e.Cog_Docente,
        Nom_Docente: e.Nom_Docente,
      })
    }
    const docentesduplicado = eliminaDuplicados(docentes)
    const docentescreado = await createDocente(docentesduplicado)
    console.log(docentescreado)


    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      periodo.push({
        Periodo: e.Periodo,
        Año: e.año,
      })
    }
    const periododuplicado = eliminaDuplicados(periodo)
    const periodocreado = await createPeriodoAcademico(periododuplicado)
    console.log(periodocreado)

 */
    for (let i = 0; i < reporte.length; i++) {
      const e = reporte[i];
      nota.push({
        GRADE_ACTIVITY: e.GRADE_ACTIVITY,
        FINAL_GRADE: e.FINAL_GRADE,
        Nota: e.Nota1,
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
    const createnotas = await createNotas(nota)
    console.log(createnotas);


    res.status(201).json({ message: "database initialize" });

  } catch (error) {
    res.status(500).json(error)
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
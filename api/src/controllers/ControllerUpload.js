const XLSX = require("xlsx");
const fs = require('fs-extra');


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

    hoja.length === 0 ? res.json({ message: "nombre de la hoja incorrecto" }) : null

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

      if (e.Facultad !== 'undefined' || undefined && e.Facultad !== null && e.Facultad !== '',
        e.NombrePrograma !== 'undefined' || undefined && e.NombrePrograma !== null && e.NombrePrograma !== '',
        e.Sede !== 'undefined' || undefined && e.Sede !== null && e.Sede !== '',
        e.Sesion !== 'undefined' || undefined && e.Sesion !== null && e.Sesion !== '',
        e.ProgramaMateria !== 'undefined' || undefined && e.ProgramaMateria !== null && e.ProgramaMateria !== '',
        e.SemMateriaNum !== 'undefined' || undefined && e.SemMateriaNum !== null && e.SemMateriaNum !== '',
        e.ProgramaEstudiante !== 'undefined' || undefined && e.ProgramaEstudiante !== null && e.ProgramaEstudiante !== '',
        e.sede !== 'undefined' || undefined && e.sede !== null && e.sede !== '',
        e.people_code_id !== 'undefined' || undefined && e.people_code_id !== null && e.people_code_id !== '',
        e.TipoDoc !== 'undefined' || undefined && e.TipoDoc !== null && e.TipoDoc !== '',
        e.Identificacion !== 'undefined' || undefined && e.Identificacion !== null && e.Identificacion !== '',
        e.Nombres !== 'undefined' || undefined && e.Nombres !== null && e.Nombres !== '',
        e.EstadoAlumnoPrograma !== 'undefined' || undefined && e.EstadoAlumnoPrograma !== null && e.EstadoAlumnoPrograma !== '',
        e.Semestre !== 'undefined' || undefined && e.Semestre !== null && e.Semestre !== '',
        e.DIRECCION !== 'undefined' || undefined && e.DIRECCION !== null && e.DIRECCION !== '',
        e.CIUDAD !== 'undefined' || undefined && e.CIUDAD !== null && e.CIUDAD !== '',
        e.DEPARTAMENTO !== 'undefined' || undefined && e.DEPARTAMENTO !== null && e.DEPARTAMENTO !== '',
        e.TelFijo !== 'undefined' || undefined && e.TelFijo !== null && e.TelFijo !== '',
        e.TelMovil !== 'undefined' || undefined && e.TelMovil !== null && e.TelMovil !== '',
        e.EMAIL !== 'undefined' || undefined && e.EMAIL !== null && e.EMAIL !== '',
        e.Genero !== 'undefined' || undefined && e.Genero !== null && e.Genero !== '',
        e.NombreMateria !== 'undefined' || undefined && e.NombreMateria !== null && e.NombreMateria !== '',
        e.CodigoMateria !== 'undefined' || undefined && e.CodigoMateria !== null && e.CodigoMateria !== '',
        e.TipoMateria !== 'undefined' || undefined && e.TipoMateria !== null && e.TipoMateria !== '',
        e.seme !== 'undefined' || undefined && e.seme !== null && e.seme !== '',
        e.Cog_Docente !== 'undefined' || undefined && e.Cog_Docente !== null && e.Cog_Docente !== '',
        e.Nom_Docente !== 'undefined' || undefined && e.Nom_Docente !== null && e.Nom_Docente !== '',
        e.Año !== 'undefined' || undefined && e.Año !== null && e.Año !== '',
        e.GRADE_ACTIVITY !== 'undefined' || undefined && e.GRADE_ACTIVITY !== null && e.GRADE_ACTIVITY !== '',
        e.FINAL_GRADE !== 'undefined' || undefined && e.FINAL_GRADE !== null && e.FINAL_GRADE !== '',
        e.Gano !== 'undefined' || undefined && e.Gano !== null && e.Gano !== '',
        e.Perdio !== 'undefined' || undefined && e.Perdio !== null && e.Perdio !== '',
        e.Rango !== 'undefined' || undefined && e.Rango !== null && e.Rango !== '',
        e.ProxNotaMin !== 'undefined' || undefined && e.ProxNotaMin !== null && e.ProxNotaMin !== '',
        e.Seccion !== 'undefined' || undefined && e.Seccion !== null && e.Seccion !== '',
        e.Periodo !== 'undefined' || undefined && e.Periodo !== null && e.Periodo !== '',
        e.año !== 'undefined' || undefined && e.año !== null && e.año !== ''
      ) {
        facultad.push({ NombreFacultad: e.Facultad });

        programas.push({
          NombrePrograma: e.ProgramaEstudiante,
          Sede: e.sede,
          Sesion: e.Sesion,
          NombreFacultad: e.Facultad,
        });


        pensum.push({
          Pensum: e.ProgramaMateria,
          Semestres: e.SemMateriaNum,
          NombrePrograma: e.ProgramaEstudiante,
          Sede: e.sede,
        });


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
        });

        materias.push({
          NombreMateria: e.NombreMateria,
          CodigoMateria: e.CodigoMateria,
          TipoMateria: e.TipoMateria,
        })


        materiaPensum.push({
          NombreMateria: e.NombreMateria,
          CodigoMateria: e.CodigoMateria,
          Pensum: e.ProgramaMateria,
          Semestres: e.SemMateriaNum,
          SemMateriaNum: e.SemMateriaNum,
          Seme: e.seme
        })

        docentes.push({
          Cog_Docente: e.Cog_Docente,
          Nom_Docente: e.Nom_Docente,
        })

        periodo.push({
          Periodo: e.Periodo,
          Año: e.año,
        })


        nota.push({
          GRADE_ACTIVITY: e.GRADE_ACTIVITY,
          FINAL_GRADE: e.FINAL_GRADE,
          Nota: e.Nota1 ? e.Nota1 : e.Nota2,
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
        });
      }
    }


    reporte = []

    const facultadrepetida = eliminaDuplicados(facultad)
    facultad = []
    const facultadcreada = await crearfacultad(facultadrepetida)
    console.log(facultadcreada)

    const programarepetida = eliminaDuplicados(programas)
    programas = []
    const programacredo = await createprograma(programarepetida)
    console.log(programacredo)

    const pensumrepetida = eliminaDuplicados(pensum)
    pensum = []
    const pensumcreado = await createpemsun(pensumrepetida)
    console.log(pensumcreado)

    const estudiaterepetido = eliminaDuplicados(estudiante)
    estudiante = []
    const estudiantecreado = await crearstudent(estudiaterepetido)
    console.log(estudiantecreado)

    const materiasduplicado = eliminaDuplicados(materias)
    materias = []
    const materiascreado = await createMaterias(materiasduplicado)
    console.log(materiascreado)

    const materiaPensumduplicado = eliminaDuplicados(materiaPensum)
    materiaPensum = []
    const materiaPensumcreado = await createMateriaspensun(materiaPensumduplicado)
    console.log(materiaPensumcreado)

    const docentesduplicado = eliminaDuplicados(docentes)
    docentes = []
    const docentescreado = await createDocente(docentesduplicado)
    console.log(docentescreado)

    const periododuplicado = eliminaDuplicados(periodo)
    periodo = []
    const periodocreado = await createPeriodoAcademico(periododuplicado)
    console.log(periodocreado)

    const createnotas = await createNotas(nota)
    nota = []
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
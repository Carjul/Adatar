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
   const {corte} = req.query
 
    //convertir hoja a json
    var reporte = XLSX.utils.sheet_to_json(hoja);

    //elimnar exel
    await fs.unlink(req.file.path);
  
    if(reporte.length === 0 ){
      res.status(500).json({ message: "nombre de la hoja incorrecto" })
      }else {

  
    var facultad = []
    var programas = []
    var pensum = []
    var estudiante = []
    var materias = []
    var materiaPensum = []
    var docentes = []
    var periodo = []
    var nota = []

    const validarCadena = (valor) => {
      const regex = /^(?![\s\S]*$)[^]*$|^null$|^"NULL"$|^undefined$|^"undefined"$/;
      return regex.test(valor);
    };

    const reporte_filtrado = reporte.filter(objeto => {
      // Verificar si algún valor es vacío, nulo o indefinido
      for (let key in objeto) {
        if (objeto.hasOwnProperty(key) && validarCadena(key)) {
          return false; // Descartar el objeto si hay un valor vacío, nulo o indefinido
        }
      }
      return true; // Mantener el objeto si no hay valores vacíos, nulos o indefinidos
    });
   console.log(reporte_filtrado.length)
   const slice = reporte_filtrado.slice(0, 100)
   console.log(slice)
     for (let i = 0; i < reporte_filtrado .length; i++) {
      const e = reporte_filtrado [i];

      
        facultad.push({ NombreFacultad: e.Facultad });

        programas.push({
          NombrePrograma: e.ProgramaMateria,
          Sede: e.sede,
          Sesion: e.Sesion,
          NombreFacultad: e.Facultad,
        });


        pensum.push({
          Pensum: e.ProgramaEstudiante,
          Semestres: e.SemMateriaNum,
          NombrePrograma:e.ProgramaMateria,
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
          Pensum: e.ProgramaEstudiante,
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
          Pensum: e.ProgramaEstudiante,
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
          NomNotaPeriodo: corte
        })


        nota.push({
          GRADE_ACTIVITY: e.GRADE_ACTIVITY,
          FINAL_GRADE: e.FINAL_GRADE? e.FINAL_GRADE : "no pertece",
          Nota: e.Nota1 ? e.Nota1 : e.Nota2,
          Gano: e.Gano,
          Perdio: parseInt(e.Perdio),
          Rango:parseInt( e.Rango),
          ProxNotaMin: e.ProxNotaMin? e.ProxNotaMin : "no calculado",
          Seccion: e.Seccion,
          NombrePrograma: e.ProgramaMateria,
          Sede: e.sede,
          NombreMateria: e.NombreMateria,
          CodigoMateria: e.CodigoMateria,
          Identificacion: e.Identificacion,
          Cog_Docente: e.Cog_Docente,
          Nom_Docente: e.Nom_Docente,
          NomNotaPeriodo: corte,
          Periodo: e.Periodo,
          Año: e.año,
        });
      
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

  }
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
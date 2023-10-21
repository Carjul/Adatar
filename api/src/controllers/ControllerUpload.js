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
    const { corte } = req.query

    //convertir hoja a json
    var reporte = XLSX.utils.sheet_to_json(hoja);

    //elimnar exel
    await fs.unlink(req.file.path);

    if (reporte.length === 0) {
      res.status(500).json({ message: "nombre de la hoja incorrecto" })
    } else {

  
      const propiedadesNecesarias = [
        'TipoDoc',
        'Identificacion',
        'people_code_id',
        'Nombres',
        'sede',
        'ProgramaEstudiante',
        'Facultad',
        'EstadoAlumnoPrograma',
        'Semestre',
        'año',
        'Periodo',
        'Sesion',
        'CodigoMateria',
        'NombreMateria',
        'Seccion',
        'GRADE_ACTIVITY',
        'GRADE_POINTS',
        'ProgramaMateria',
        'TipoMateria',
        'DIRECCION',
        'CIUDAD',
        'DEPARTAMENTO',
        'TelFijo',
        'TelMovil',
        'EMAIL',
        'Genero',
        'seme',
        'Cog_Docente',
        'Nom_Docente',
        'Contar',
        'SemNumero',
        'Nota1',
        'Gano',
        'Perdio',
        'Rango',
        'SemMateriaNum',
      ];
      const propiedadesNecesarias2 = [
        'TipoDoc',
        'Identificacion',
        'people_code_id',
        'Nombres',
        'sede',
        'ProgramaEstudiante',
        'Facultad',
        'EstadoAlumnoPrograma',
        'Semestre',
        'año',
        'Periodo',
        'Sesion',
        'CodigoMateria',
        'NombreMateria',
        'Seccion',
        'GRADE_ACTIVITY',
        'GRADE_POINTS',
        'ProgramaMateria',
        'TipoMateria',
        'DIRECCION',
        'CIUDAD',
        'DEPARTAMENTO',
        'TelFijo',
        'TelMovil',
        'EMAIL',
        'Genero',
        'seme',
        'Cog_Docente',
        'Nom_Docente',
        'Contar',
        'SemNumero',
        'Nota2',
        'Gano',
        'Perdio',
        'Rango',
        'SemMateriaNum',
      ];
      var arrayObjetosCompletos = reporte.filter((objeto) => propiedadesNecesarias.every((propiedad) => objeto.hasOwnProperty(propiedad))
      );

      if (arrayObjetosCompletos.length === 0) {
        arrayObjetosCompletos = reporte.filter((objeto) => propiedadesNecesarias2.every((propiedad) => objeto.hasOwnProperty(propiedad)));
      }
      console.log(arrayObjetosCompletos.length)
  
      /* const reporte_filtrado = arrayObjetosCompletos.filter(obj => {
        for (let key in obj) {
          if (obj[key] === null || obj[key] === NaN || obj[key] === undefined || obj[key] == "null" || obj[key] == "NULL" || obj[key] == "undefined" || obj[key] === '') {
            return false;
          }
        }
        return true;
      });
      reporte = []

      console.log(reporte_filtrado.length) */
     
      const data = [];

      for (let i = 0; i < arrayObjetosCompletos.length; i++) {
        const e = arrayObjetosCompletos[i];
      
        data.push({
          NombreFacultad: e.Facultad,
          NombrePrograma: e.ProgramaMateria,
          Sede: e.sede,
          Sesion: e.Sesion,
          Pensum: e.ProgramaEstudiante,
          Semestres: e.SemMateriaNum,
          People_code_id: e.people_code_id,
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
          SemeNumero: e.SemNumero,
          NombreMateria: e.NombreMateria,
          CodigoMateria: e.CodigoMateria,
          TipoMateria: e.TipoMateria,
          SemMateriaNum: e.SemMateriaNum,
          Seme: e.seme,
          Cog_Docente: e.Cog_Docente,
          Nom_Docente: e.Nom_Docente,
          Periodo: e.Periodo,
          Año: e.año,
          NomNotaPeriodo: corte,
          GRADE_ACTIVITY: e.GRADE_ACTIVITY,
          FINAL_GRADE: e.FINAL_GRADE ? e.FINAL_GRADE : "no pertece",
          Nota: e.Nota1 ? e.Nota1 : e.Nota2,
          Gano: parseInt(e.Gano),
          Perdio: parseInt(e.Perdio),
          Rango: e.Rango,
          ProxNotaMin: e.ProxNotaMin ? e.ProxNotaMin : "no calculado",
          Seccion: e.Seccion,
        });
      }

      const periodocreado = await createPeriodoAcademico(data)
      console.log(periodocreado)

      const docentescreado = await createDocente(data)
      console.log(docentescreado)

      const materiascreado = await createMaterias(data)
      console.log(materiascreado)

      const facultadcreada = await crearfacultad(data)
      console.log(facultadcreada)

      const programacredo = await createprograma(data)
      console.log(programacredo)

      const pensumcreado = await createpemsun(data)
      console.log(pensumcreado)

      const estudiantecreado = await crearstudent(data)
      console.log(estudiantecreado)

      const materiaPensumcreado = await createMateriaspensun(data)
      console.log(materiaPensumcreado)

      const createnotas = await createNotas(data)
      console.log(createnotas);

      data = []

      res.json({ message: "File Saved" });
    }
  } catch (error) {
    res.json(error)
  }
}

module.exports = {
  UploadFile
}


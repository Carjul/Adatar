import axios from "axios";
import { setNota,setPeriodo,setPrograma,setDocente,setEstudiante,setMateriaPorPensum, setMateria, setPensum,setFacultad } from '../FeatureSlices/data';
import { setMsg } from "../FeatureSlices/MsgApi";
import { setUsers } from "../FeatureSlices/users";


const {REACT_APP_API} = process.env;


export const getData = (token) => (dispatch) => {
  try {

    const query = `query{
      peticion_facultad{
      id
      NombreFacultad
      }
      peticion_periodoAcademico{
      id
      Periodo
      Year
      }
      peticion_programa{
      id
      NombrePrograma
      Sede
      Sesion
      FacultadeId
      }
      peticion_pensum{
      id
      Pensum
      Semestres
      ProgramaId
      }
      peticion_materias{
      id
      CodigoMateria
      NombreMateria
      TipoMateria
      }
      peticion_docentes{
      id
      Cog_Docente
      Nom_Docente
      }
      peticion_materiaPorPensums{
      id
      Seme
      SemMateriaNum
      PensumId
      MateriaId
      }
      peticion_estudiantes{
      id
      TipoDoc
      Identificacion
      Nombres
      EstadoAlumnoPrograma
      Semestre
      Direccion
      Ciudad
      Departamento
      TelFijo
      TelMovil
      Email
      Genero
      SemeNumero
      PensumId

      }
      peticion_notas{
      id
      GRADE_ACTIVITY
      Nota
      FINAL_GRADE
      Gano
      Perdio
      Rango
      ProxNotaMin
      Seccion
      EstudianteId
      MateriaId
      ProgramaId
      DocenteId
      PeriodoAcademicoId
      }
    }`;

    
    axios.post(`${REACT_APP_API}/api/v1?token=${token}`, { query })
      .then((response) => {
        dispatch(setNota(response.data.data.peticion_notas));
        dispatch(setPeriodo(response.data.data.peticion_periodoAcademico));
        dispatch(setPrograma(response.data.data.peticion_programa));
        dispatch(setDocente(response.data.data.peticion_docentes));
        dispatch(setEstudiante(response.data.data.peticion_estudiantes));
        dispatch(setMateriaPorPensum(response.data.data.peticion_materiaPorPensums));
        dispatch(setMateria(response.data.data.peticion_materias));
        dispatch(setPensum(response.data.data.peticion_pensum));
        dispatch(setFacultad(response.data.data.peticion_facultad));
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export const postFile =(obj,token)=>(dispatch)=>{

    axios.post(`${REACT_APP_API}/api/v1/upload?token=${token}`,obj, {
      headers: { "Content-Type": "multipart/form-data" }
  }
   ).then((result) => { 
    dispatch(setMsg(result.data.message))
  }).catch(err=>{
    dispatch(setMsg(err.message))
  });
  
}

export const senduser=(obj)=>(dispatch)=>{
  axios.post(`${REACT_APP_API}/login`,obj).then((result) => { 
    dispatch(setUsers(result.data))
  }).catch(err=>{
    console.log(err);
  });
}

export const exit=()=>{
  axios.get(`${REACT_APP_API}/logout`).then((result) => { 
    console.log(result);
  }).catch(err=>{
    console.log(err);
  });
}
/* export const getOneData = (id) => (dispatch) => {
  try {
    const mutation = `mutation{
            Buscar_notas(id: ${id}){
            id
            GRADE_ACTIVITY
            Nota
            FINAL_GRADE
            Gano
            Perdio
            Rango
            ProxNotaMin
            Seccion
            EstudianteId
            MateriaId
            ProgramaId
            DocenteId
            PeriodoAcademicoId
          }}`;

    axios.post('http://localhost:3004/', { mutation })
      .then((response) => {
        dispatch(setOneData(response.data.data.Buscar_notas));
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
} */


import axios from "axios";
import {  setPeriodo,  setPrograma,  setMateriaPorPensum, setMateria, setPensum, setFacultad, setNota, setSede,setDocente,setEstudiante } from '../FeatureSlices/data';
import { setMsg } from "../FeatureSlices/MsgApi";
import { setUsers,setConfig } from "../FeatureSlices/users";
import jwt_decode from "jwt-decode";


const url = import.meta.env.VITE_PUBLIC_API; 



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

      peticion_materiaPorPensums{
      id
      Seme
      SemMateriaNum
      PensumId
      MateriaId
      }
      
    }`;


    axios.post(`${url}/api/v1?token=${token}`, { query })
      .then((response) => {
        dispatch(setPeriodo(response.data.data.peticion_periodoAcademico));
        dispatch(setSede(response.data.data.peticion_programa));
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

export const postFile = (obj, token) => (dispatch) => {

  axios.post(`${url}/api/v1/upload?token=${token}`, obj, {
    headers: { "Content-Type": "multipart/form-data" }
  }
  ).then((result) => {
    dispatch(setMsg(result.data.message))
  }).catch(err => {
    dispatch(setMsg(err.message))
  });

}

export const getProgramas=(Sede,token)=>(dispatch)=>{
  const query=`mutation{
    Buscar_programas_sede(Sede:"${Sede}"){
     id
     NombrePrograma
     Sede
     Sesion
     FacultadeId
     
   }
   }`

   axios.post(`${url}/api/v1?token=${token}`, { query })
   .then((res)=> {
    dispatch( setPrograma(res.data.data.Buscar_programas_sede))
   })
   .catch(err => {
    dispatch(setMsg(err.message))
  });
}

export const getuser = (token) => (dispatch) => {
  const query = `query{
    peticion_user{
      id
      Avatar
      Nombre
      Email
      Password
      RolId
    }
        }`
    axios.post(`${url}/api/v1?token=${token}`, { query })
  .then((result)=>{
   dispatch(setConfig(result.data.data.peticion_user))
  })
  .catch((err)=>{
    console.log(err)
  })
}

export const senduser = (obj) => (dispatch) => {
  axios.post(`${url}/login`, obj).then((result) => {
    if (result.data.token) {
      localStorage.setItem('token', result.data.token)
      var decoded = jwt_decode(result.data.token);
      localStorage.setItem('id', decoded.user.id);
      localStorage.setItem('RolId', decoded.user.RolId);
      localStorage.setItem('Email', decoded.user.Email);
      localStorage.setItem('Name', decoded.user.Nombre);
      localStorage.setItem('Avatar', decoded.user.Avatar);
    } else {
      console.log('no token');
    }
    dispatch(setUsers(result.data))
  }).catch(err => {
    console.log(err);
  });
}

export const exit = () => {
  axios.get(`${url}/logout`).then((result) => {
    console.log(result);
  }).catch(err => {
    console.log(err);
  });
}

export const deleteOneData = (id,token) => (dispatch) => {

    const query = `mutation{
      deleteuser(id:"${id}")
    }`
 
    axios.post(`${url}/api/v1?token=${token}`, {query})
    .then((result) => {
    dispatch(setMsg(result.data.data.deleteuser))
  }).catch(err => {
    dispatch(setMsg(err.message))
  });

}

export const updateOneData = (id, rol,token) => (dispatch) => {
  const  query  = `mutation{
    update(id:"${id}", RolId:"${rol}")
  }`

 axios.post(`${url}/api/v1?token=${token}`, { query })
 .then((result) => {
    dispatch(setMsg(result.data.data.update))
  }).catch(err => {
    dispatch(setMsg(err.message))
  });

}
export const get_Nota_Año = (id,token) => (dispatch) => {
  try {
    const query = `mutation{
      notasporyear(PeriodoAcademicoId:"${id}"){
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

        axios.post(`${url}/api/v1?token=${token}`, { query })
      .then((response) => {
        dispatch(setNota(response.data.data.notasporyear));
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
} 
export const getDataperson =(token)=>(dispatch)=>{
  try {
    const query =`query{
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
      peticion_docentes{
        id
        Cog_Docente
        Nom_Docente
        
      }
    }
    `
axios.post(`${url}/api/v1?token=${token}`, { query })
.then(res=>{
  dispatch(setDocente(res.data.data.peticion_docentes))
  dispatch(setEstudiante(res.data.data.peticion_estudiantes))

})
  } catch (error) {
    console.log(error)
  }
}



import { setEstMaterias ,setProgramatemp ,setNotasEst, setSemestate, setPeriodo, setPrograma, setNota, setNota2, setSede, setDocente, setEstudiante, setEstSemestre,setNotas_Por_Estudiante, setNotasmateria, setNotasperma, setNotastate } from '../FeatureSlices/data';
import { setMsg } from "../FeatureSlices/MsgApi";
import { setUsers, setConfig,setRoles } from "../FeatureSlices/users";
import jwt_decode from "jwt-decode";


const url = import.meta.env.VITE_PUBLIC_API;
const url2 = import.meta.env.VITE_PUBLIC_SEVICE;

import axios from "axios";

export const getdocx = (params) => (dispatch) => {
  fetch(`${url}/descargar-docx`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(params)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al descargar el archivo');
    }
    return response.blob(); // Convertir la respuesta a un objeto Blob
  })
  .then(blob => {
    // Crear un enlace temporal para descargar el archivo
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Reporte.docx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Eliminar el enlace después de la descarga
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


export const getdataEst = (params) => (dispatch) => {
  axios.post(`${url2}/notas`, params).then((result) => {
    dispatch(setNotas_Por_Estudiante(result.data))
  }).catch(err => {
    console.log(err);
  });
}
export const getdataEstSem = (params) => (dispatch) => {
  axios.post(`${url2}/EstSemestres`, params).then((result) => {
    dispatch(setEstSemestre(result.data))
  }).catch(err => {
    console.log(err);
  });
}
export const EstMateria= (params) => (dispatch) => {
  axios.post(`${url2}/EstMateria`, params).then((result) => {
    dispatch(setEstMaterias(result.data))
  }).catch(err => {
    console.log(err);
  });
}

export const getNotasRango = (params) => (dispatch) => {
  axios.post(`${url2}/notas/rango`, params).then((result) => {
    dispatch(setNotasmateria(result.data))
    dispatch(setNotastate(result.data))
  }).catch(err => {
    console.log(err);
  });
}

export const getSemestres = (params) => (dispatch) => {
  axios.post(`${url2}/semestres`, params).then((result) => {
    dispatch(setSemestate(result.data))
  }).catch(err => {
    console.log(err);
  });
}

export const getMaterias = (params) => (dispatch) => {
  axios.post(`${url2}/Materias`, params).then((result) => {
    dispatch(setNotasperma(result.data))
  }).catch(err => {
    console.log(err);
  });
}
export const getnotasEst = (params) => (dispatch) => {
  const urlgetEst = `${url2}/datosEst?` + new URLSearchParams(params).toString();
  axios.get(urlgetEst).then((result) => {
    dispatch(setNotasEst(result.data))
  }).catch(err => {
    console.log(err);
  });
}


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
      NomNotaPeriodo
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
      
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export const postFile = (obj, token, x) => (dispatch) => {
  axios.post(`${url}/api/v1/upload?token=${token}&corte=${encodeURIComponent(x)}`, obj, {
    headers: { "Content-Type": "multipart/form-data" }
  }
  ).then((result) => {
    dispatch(setMsg(result.data.message))
  }).catch(err => {
      dispatch(setMsg(err.message))
 
  });

}
export const userUpdate = (obj) => (dispatch) => {
    axios.put(`${url}/usuario`, obj).then((result) => {
      dispatch(setMsg(result.data.message))
    }).catch(err => {
      dispatch(setMsg(err.message))
    });
  
}
export const userDeleteData = (obj) => (dispatch) => {
  axios.put(`${url}/ElminarDataUsuario`, obj).then((result) => {
    dispatch(setMsg(result.data.message))
  }).catch(err => {
    dispatch(setMsg(err.message))
  });

}

  

export const getProgramas = (Sede, token) => (dispatch) => {
  const query = `mutation{
    Buscar_programas_sede(Sede:"${Sede}"){
     id
     NombrePrograma
     Sede
     Sesion
     FacultadeId
     
   }
   }`

  axios.post(`${url}/api/v1?token=${token}`, { query })
    .then((res) => {
      dispatch(setPrograma(res.data.data.Buscar_programas_sede))
    })
    .catch(err => {
      dispatch(setMsg(err.message))
    });
}

export const getPrograma = (params, token) =>(dispatch) =>{
  const query = `mutation{
    Buscar_programas(id:${params}){
     NombrePrograma
   }
   }`

 axios.post(`${url}/api/v1?token=${token}`, { query })
    .then((res) => {
      dispatch(setProgramatemp(res.data.data.Buscar_programas))
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
      Datos
    }
        }`
  axios.post(`${url}/api/v1?token=${token}`, { query })
    .then((result) => {
      dispatch(setConfig(result.data.data.peticion_user))
    })
    .catch((err) => {
      console.log(err)
    })
}
export const getRoles = (token) => (dispatch) => {
  const query = `query{
    peticion_rol{
      id
      rol
    }
        }`
  axios.post(`${url}/api/v1?token=${token}`, { query })
    .then((result) => {
      dispatch(setRoles(result.data.data.peticion_rol))
    })
    .catch((err) => {
      console.log(err)
    })
}

export const senduser = (obj) => (dispatch) => {

  axios.post(`${url}/login`, obj.user).then((result) => {
    if (result.data.token) {
      localStorage.setItem('token', result.data.token)
      var decoded = jwt_decode(result.data.token);
      if (decoded.user.id === 0) {
        localStorage.setItem('msg', decoded.user.msg);
      }
      else {
        const objetoJSON = JSON.stringify(decoded);
        localStorage.setItem('userdecode', objetoJSON)
        localStorage.setItem('id', decoded.user.id);
        localStorage.setItem('RolId', decoded.user.RolId);
        localStorage.setItem('Email', decoded.user.Email);
        localStorage.setItem('Name', decoded.user.Nombre);
        localStorage.setItem('Avatar', decoded.user.Avatar);
      }

    } else {
      console.log('no token');
    }
    dispatch(setUsers(result.data))
  }).catch(err => {
    console.log(err);
  });
}


export const register = (obj) => (dispatch) => {
  
  
    axios.post(`${url}/registro`, obj.user).then((result) => {
      if (result.data.token) {
        localStorage.setItem('token', result.data.token)
        var decoded = jwt_decode(result.data.token);
        const objetoJSON = JSON.stringify(decoded);
        localStorage.setItem('userdecode', objetoJSON)
        localStorage.setItem('id', decoded.user.id);
        localStorage.setItem('RolId', decoded.user.RolId);
        localStorage.setItem('Email', decoded.user.Email);
        localStorage.setItem('Name', decoded.user.Nombre);
        localStorage.setItem('Avatar', decoded.user.Avatar);
  
      } else {
        console.log('ya esta registrado');
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

export const deleteOneData = (id, token) => (dispatch) => {

  const query = `mutation{
      deleteuser(id:"${id}")
    }`

  axios.post(`${url}/api/v1?token=${token}`, { query })
    .then((result) => {
      dispatch(setMsg(result.data.data.deleteuser))
    }).catch(err => {
      dispatch(setMsg(err.message))
    });

}

export const updateOneData = (id, rol, token) => (dispatch) => {
  const query = `mutation{
    update(id:"${id}", RolId:"${rol}")
  }`

  axios.post(`${url}/api/v1?token=${token}`, { query })
    .then((result) => {
      dispatch(setMsg(result.data.data.update))
    }).catch(err => {
      dispatch(setMsg(err.message))
    });

}
export const get_Nota_Año = (params) => (dispatch) => {

  axios.post(`${url2}/Notas_periodo`, params)
    .then((response) => {
      dispatch(setNota(response.data));
    })
    .catch((error) => {
      console.error(error);
    });

}
export const get_Nota_facultad = (params) => (dispatch) => {

  axios.post(`${url2}/Notas_Facultad`, params)
    .then((response) => {
      dispatch(setNota(response.data));
    })
    .catch((error) => {
      console.error(error);
    });

}
export const get_Nota_facultades = (params) => (dispatch) => {

   axios.get(`${url2}/Notas_Facultades?NomNotaPeriodo=${params}`)
    .then((response) => {
      dispatch(setNota2(response.data));
    })
    .catch((error) => {
      console.error(error);
    }); 

}
export const getDataperson = (token) => (dispatch) => {
  try {
    const query = `query{
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
      .then(res => {
        dispatch(setDocente(res.data.data.peticion_docentes))
        dispatch(setEstudiante(res.data.data.peticion_estudiantes))
      })
  } catch (error) {
    console.log(error)
  }
}


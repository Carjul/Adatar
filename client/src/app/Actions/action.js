import axios from "axios";
import {setData, setOneData} from '../FeatureSlices/data';

  


export const getData = () => (dispatch) => {
    try {
       
          const query = `query{ peticion_notas{
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

       
        axios.post('http://localhost:3004/', {query})
        .then((response) => {
            dispatch(setData(response.data.data.peticion_notas));
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
        console.log(error);
    }
}

export const getOneData = (id) => (dispatch) => {
    try {
        const query = `mutation{
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

        axios.post('http://localhost:3004/', {query})
        .then((response) => {
            dispatch(setOneData(response.data.data.Buscar_notas));
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
        console.log(error);
    }
}
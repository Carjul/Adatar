import { Nav } from './Nav';

import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../app/Actions/action';
import Sidebar from './sidebar';
import Footer from './footer';
import React from 'react';

export const Dashboard = () => {

    const {
        programa,
        periodoAcademico} = useSelector(state => state.data);
        const x = useSelector(state => state.data);
    console.log(x)
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    React.useEffect(() => {
        dispatch(getData(token));
    }, [dispatch, token]);


    const HandleChageP = (e) => {
        console.log(e.target.value)
    }
    const HandleChageS = (e) => {
        console.log(e.target.value)
    }
    const HandleChageC = (e) => {
        console.log(e.target.value)
    }

    const HandleChageE = (e) => {
        console.log(e.target.value)
    }

    return (
        <>
            <Nav />
            <div className='flex flex-row justify-content-around'>
                <Sidebar props={4} />
                <div>
                    {/* filtar por carreras, y por un semestres.
         mostrar estudiantes materias y notas.
         mostras los estudiants que pueden perder el semestres */}
                    <div className='flex flex-row flex-wrap '>
                        <select name="Periodo academico" onChange={HandleChageP}>
                            <option defaultValue="0">Periodo Academico</option>
                            {periodoAcademico?.map(e =>
                                <option key={e.id} value={e.id}>{e.Year} {e.Periodo}</option>
                            )}
                        </select>
                        <select name="Sede" onChange={HandleChageS} >
                            <option defaultValue="0">Sede</option>
                            {programa?.map(e =>
                                <option key={e.id} value={e.id}>{e.Sede}</option>
                            )}
                        </select>
                        <select name="Programa" onChange={HandleChageC} >
                            <option defaultValue="0">Carrera</option>
                            {programa?.map(e =>
                                <option key={e.id} value={e.id}>{e.NombrePrograma}</option>
                            )}
                        </select>

                        <select name="Estado de notas" onChange={HandleChageE}>
                            <option defaultValue="0">Estado de notas</option>
                            <option value="1">Gano</option>
                            <option value="2">Perdio</option>
                        </select>


                    </div>
                </div>

            </div>
            <Footer />

        </>
    )
}
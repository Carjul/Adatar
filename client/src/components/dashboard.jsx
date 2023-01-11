import { Nav } from './Nav';

import { useSelector, useDispatch } from 'react-redux';
import { getData, get_Nota_Año } from '../app/Actions/action';
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
       dispatch(get_Nota_Año(e.target.value, token))
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
                    <div className='flex flex-row flex-wrap p-1 '>
                        <div className="p-2">
                        <select name="Periodo academico" onChange={HandleChageP} className="select select-secondary select-sm max-w-xs">
                            <option defaultValue="0">Periodo Academico</option>
                            {periodoAcademico?.map(e =>
                                <option key={e.id} value={e.id}>{e.Year} {e.Periodo}</option>
                            )}
                        </select>

                        </div>
                        <div className="p-2">
                        <select name="Sede" onChange={HandleChageS} className="select select-secondary select-sm max-w-xs">
                            <option defaultValue="0">Sede</option>
                            {programa?.map(e =>
                                <option key={e.id} value={e.id}>{e.Sede}</option>
                            )}
                        </select>

                        </div>
                        <div className="p-2">
                        <select name="Programa" onChange={HandleChageC} className="select select-secondary select-sm w-a max-w-xs">
                            <option defaultValue="0">Carrera</option>
                            {programa?.map(e =>
                                <option key={e.id} value={e.id}>{e.NombrePrograma}</option>
                            )}
                        </select>

                        </div>
                        <div className="p-2">
                        <select name="Estado de notas" onChange={HandleChageE} className="select select-secondary select-sm max-w-xs">
                            <option defaultValue="0">Estado de notas</option>
                            <option value="1">Gano</option>
                            <option value="2">Perdio</option>
                        </select>

                        </div>



                    </div>
                </div>

            </div>
            <Footer />

        </>
    )
}
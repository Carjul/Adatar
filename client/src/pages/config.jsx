import Nav from '../components/Nav';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import { useEffect, useRef, useState } from 'react';
import { getuser, deleteOneData, updateOneData, getRoles, getProgramas, getSemestres, userUpdate, userDeleteData } from '../app/Actions/action';
import { setMsg } from '../app/FeatureSlices/MsgApi';



const Data = { id: "", Datos: [{ Programa: "", Semestres: "", ProgramaName: "" }] }

const Config = () => {

    const { message } = useSelector(state => state.msg);
    const { config } = useSelector(state => state.token);
    const { roles } = useSelector(state => state.token);
    const { programa, semestres } = useSelector(state => state.data);

    const dispatch = useDispatch();

    const id = localStorage.getItem('id');

    const user = config?.filter(e => e.id !== id)
    const coordinador = config?.filter(e => e.RolId === "3" || e.RolId === "2")
    const { navState } = useSelector(state => state.tema);

    const token = localStorage.getItem('token');


    useEffect(() => {
        dispatch(getuser(token))
        dispatch(getRoles(token))
        dispatch(getProgramas("Campus Montería", token))

        setTimeout(() => {
            dispatch(setMsg(""))
        }, 3000)
    }, [dispatch, token, message])



    const handlechanges = (e) => {
        Data.Datos[0].Semestres = e.target.value
        dispatch(userUpdate(Data))

    }


    function MyButton({ id }) {

        const buttonEl = useRef(null);
        useEffect(() => {
            const currentButtonEl = buttonEl.current;
            const handleClick = () => {
                dispatch(deleteOneData(id, token))
            };
            currentButtonEl.addEventListener('click', handleClick);
        }, [id]);

        return <button className="btn btn-outline btn-error" ref={buttonEl}>Eliminar</button>;
    }
    function Formupdate({ id }) {
        const handlechange = (e) => {
            dispatch(updateOneData(id, e.target.value, token));
        }
        return (
            <div>
                <select onChange={handlechange} className="select select-primary select-sm ">
                    <option defaultChecked> Roles</option>
                    {roles?.map(e =>

                        <option value={e.id} key={e.id}>{e.rol}</option>
                    )}
                </select>

            </div>
        )
    }

    return (
        <>
            <Nav />
            <div className='flex flex-row justify-content-around '>
                {navState === 'menu' && <Sidebar props={5} />}

                <div className='flex flex-col items-center w-full h-full'>
                    {message === "usuario actualizado" ? <div className="alert alert-success shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>El Rol ha sido actualizado</span>
                        </div>
                    </div> : ""}
                    {message === "usuario eliminado" ? <div className="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Usuario eliminado</span>
                        </div>
                    </div> : ""}

                    <h2 className='text-xl mb-5'>Asignar Roles</h2>

                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-center text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr className='flex md:table-row flex-col md:flex-row"'>
                                                <th scope="col" className="px-6 py-2">Avatar</th>
                                                <th scope="col" className="px-6 py-2">Nombre</th>
                                                <th scope="col" className="px-6 py-2">Rol</th>
                                                <th scope="col" className="px-6 py-2">Cambiar Rol</th>
                                                <th scope="col" className="px-6 py-2">Eliminar Usurio</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {user?.map(e =>
                                                  <tr key={e.id} className="border-b dark:border-neutral-500 flex md:table-row flex-col md:flex-row">
                                                    <td className="whitespace-nowrap px-6 py-2">
                                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                                            <div className="w-10 rounded-full">
                                                                <img src={`${e.Avatar}`} alt="Avatar" width={40} height={50} />
                                                            </div>
                                                        </label>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-2 ">{e.Nombre}</td>
                                                    <td className="whitespace-nowrap px-6 py-2 ">
                                                        {parseInt(e.RolId) === 1 ? <div className="card-actions justify-start">
                                                            <div className="badge badge-outline bg-success">Administrador</div>
                                                        </div> : ""}
                                                        {parseInt(e.RolId) === 2 ? <div className="card-actions justify-start">
                                                            <div className="badge badge-outline bg-info">Directivo</div>
                                                        </div> : ""}
                                                        {parseInt(e.RolId) === 3 ? <div className="card-actions justify-start">
                                                            <div className="badge badge-outline bg-secondary">Coordinador de semestre</div>
                                                        </div> : ""}
                                                        {parseInt(e.RolId) === 4 ? <div className="card-actions justify-start">
                                                            <div className="badge badge-outline bg-primary">Docente</div>
                                                        </div> : ""}
                                                        {parseInt(e.RolId) === 5 ? <div className="card-actions justify-start">
                                                            <div className="badge badge-outline bg-accent">Estudiante</div>
                                                        </div> : ""}
                                                        {parseInt(e.RolId) === 6 ? <div className="card-actions justify-start">
                                                            <div className="badge badge-outline bg-error">Visitante</div>
                                                        </div> : ""}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-2 "><Formupdate id={e.id} /></td>
                                                    <td className="whitespace-nowrap px-6 py-2 "><MyButton id={e.id} /></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />

                    <h2 className='text-xl mb-5 '>Asignar Programa y Semestre</h2>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 mb-20">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center text-sm font-light ">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr className='flex md:table-row flex-col md:flex-row"'>
                                            <th className="p-1 px-6 py-2 ">Avatar</th>
                                            <th className="p-1 px-6 py-2 ">Nombre</th>
                                            <th className="p-1 px-6 py-2 ">A. Pro</th>
                                            <th className="p-1 px-6 py-2 ">A. Sem</th>
                                            <th className="p-1 px-6 py-2 ">Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coordinador?.map(i =>
                                            <tr key={i.id} className="border-b dark:border-neutral-500 flex md:table-row flex-col md:flex-row">
                                                <td className="p-1 px-6 py-2 ">
                                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                                        <div className="w-10 rounded-full">
                                                            <img src={`${i.Avatar}`} alt="Avatar" width={40} height={50} />
                                                        </div>
                                                    </label>
                                                </td>
                                                <td className="p-1 px-6 py-2 ">{i.Nombre}</td>


                                                <td className='p-1 px-6 py-2 '>
                                                    <div>
                                                        <select onChange={(el) => {
                                                            dispatch(updateOneData(i.id, el.target.value, token));
                                                            dispatch(getSemestres({ "programa_id": el.target.value }))
                                                            Data.id = i.id
                                                            Data.Datos[0].Programa = el.target.value
                                                            Data.Datos[0].ProgramaName = programa?.filter(e => e.id === el.target.value)[0].NombrePrograma
                                                        }} className="select select-primary select-sm ">

                                                            {programa?.map(e => {
                                                                if (i.Datos === null) {
                                                                    return <option key={e.id} value={e.id}>{e.NombrePrograma}</option>;
                                                                } else if (JSON.parse(i.Datos[0]).Programa === e.id) {
                                                                    return <option key={e.id} defaultValue={e.id}>{e.NombrePrograma}</option>;
                                                                }
                                                            }
                                                            )}

                                                        </select>

                                                    </div>
                                                </td>
                                                <td className='p-1 px-6 py-2 '>
                                                    <div>
                                                        <select onChange={handlechanges} className="select select-primary select-sm ">
                                                            {i.Datos === null ? <option defaultValue={"1"}>Semestres</option> : <option defaultValue={JSON.parse(i.Datos[0]).Semestres}>{JSON.parse(i.Datos[0]).Semestres}</option>}
                                                            {i.RolId === "3" && semestres?.map(e =>
                                                                <option key={e} value={e}>{e}</option>)
                                                            }
                                                        { i.RolId === "2" && <option key={0} value={0}>all</option>}
                                                        </select>
                                                    </div>
                                                </td>
                                                <td className='p-1 px-6 py-2 '>
                                                {i.Datos !== null ? <button className="btn btn-outline btn-error ml-4" onClick={() => dispatch(userDeleteData({ id: i.id }))}>x</button> : ""}

                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>

                        </div>

                    </div>

                </div>
            </div>


            <Footer />
        </>
    )
}






export default Config
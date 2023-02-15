import Nav from '@/components/Nav';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '@/components/sidebar';
import Footer from '@/components/footer';
import { useEffect, useRef } from 'react';
import { getuser, deleteOneData, updateOneData } from '@/app/Actions/action';
import { setMsg } from '@/app/FeatureSlices/MsgApi';
import PrivateRoute from '@/components/proteccion';
import { getCookie } from 'cookies-next'
import Image from 'next/image';

const Config = () => {
    const { message } = useSelector(state => state.msg);
    const { config } = useSelector(state => state.token);
    const dispatch = useDispatch();

    const id = getCookie('id')

    const user = config?.filter(e => e.id !== id)
    const token = getCookie('token');


    useEffect(() => {
        dispatch(getuser(token))
    }, [dispatch, token])

    useEffect(() => {
        setTimeout(() => {
            dispatch(setMsg(""))
            dispatch(getuser(token))
        }, 6000)
    }, [dispatch, message,token])

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
                    <option value="0">Roles</option>
                    <option value="1">Administrador</option>
                    <option value="2">Directivo</option>
                    <option value="3">Coordinador de semestre</option>
                </select>

            </div>
        )
    }
    return (
        <>
            <PrivateRoute />
            <Nav />
            <div className='flex flex-row justify-content-around'>
                <Sidebar props={5} />
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
                    <table className="flex flex-col">
                        <thead>
                            <tr className="flex flex-wrap flex ">
                                <th className="p-4">Avatar</th>
                                <th className="p-4">Nombre</th>
                                <th className="p-4">Correo</th>
                                <th className="p-4">Rol</th>
                                <th className="p-4">Cambiar Rol</th>
                                <th className="p-4">Eliminar Usurio</th>
                            </tr>

                        </thead>


                        <tbody>
                            {user?.map(e =>
                                <tr key={e.id} className="flex flex-wrap border border-base-300">
                                    <td className="p-2">
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                <Image src={e.Avatar} alt="Avatar" width={40} height={50} />
                                            </div>
                                        </label>
                                    </td>
                                    <td className="p-2">{e.Nombre}</td>
                                    <td className="p-2">{e.Email}</td>
                                    <td className="p-2">
                                        {parseInt(e.RolId) === 1 ? <div className="card-actions justify-start">
                                            <div className="badge badge-outline bg-secondary">Administrador</div>
                                        </div> : ""}
                                        {parseInt(e.RolId) === 2 ? <div className="card-actions justify-start">
                                            <div className="badge badge-outline bg-secondary">Directivo</div>
                                        </div> : ""}
                                        {parseInt(e.RolId) === 3 ? <div className="card-actions justify-start">
                                            <div className="badge badge-outline bg-secondary">Coordinador de semestre</div>
                                        </div> : ""}
                                    </td>
                                    <td className="p-2"><Formupdate id={e.id} /></td>
                                    <td className="p-2"><MyButton id={e.id} /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
            <Footer />
        </>
    )
}






export default Config
import { Nav } from './Nav';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './sidebar';
import Footer from './footer';
import { useEffect,useRef} from 'react';
import { getuser,  deleteOneData, updateOneData  } from '../app/Actions/action';
const Config = () => {
    const { message } = useSelector(state => state.msg);
    const { config } = useSelector(state => state.token);
    const id= localStorage.getItem('id')
    const user= config?.filter(e=>e.id !== id)
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    console.log(message)
    useEffect(() => {
        dispatch(getuser(token))
    }, [dispatch, token])
   
    function MyButton({id}) {
    
        const buttonEl = useRef(null);
        useEffect(() => {
            const currentButtonEl = buttonEl.current;
            const handleClick = () => {
                dispatch(deleteOneData(id,token))
                dispatch(getuser(token))
            };
            currentButtonEl.addEventListener('click', handleClick);
        
           
          }, [id]);
    
      return <button className="btn btn-secundary"ref={buttonEl}>Eliminar</button>;
    }
    function Formupdate ({id}){
        const handlechange = (e) => {
            dispatch(updateOneData(id,e.target.value,token));
            dispatch(getuser(token))
          }
    return (
        <div>
            <select onChange={handlechange} className="select select-primary w-5px max-w-xs border-none">
                <option value="0">Roles</option>
                <option value="1">Administrador</option>
                <option value="2">Directivo</option>
                <option value="3">Coordinador</option>
            </select>

        </div>
    )
    }
    return (
        <>
            <Nav />
            <div className='flex flex-row justify-content-around'>
                <Sidebar ids={5} />
                <div>
                    <table className="flex flex-col">
                        <thead>
                            <tr className="flex flex-wrap flex ">
                                <th className="p-2">Avatar</th>
                                <th className="p-2">Nombre</th>
                                <th className="p-2">Correo</th>
                                <th className="p-2">Rol</th>
                                <th className="p-2">Cambiar Rol</th>
                                <th className="p-2">Eliminar Usurio</th>
                            </tr>
                            
                        </thead>
                            
                        
                        <tbody>
                            {user?.map(e =>
                                <tr key={e.id} className="flex flex-wrap border border-base-300">
                                    <td className="p-2">
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={e.Avatar} alt="img" />
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
                                            <div className="badge badge-outline bg-secondary">Coordinador</div>
                                        </div> : ""}
                                    </td>
                                    <td className="p-2"><Formupdate id= {e.id}/></td>
                                    <td className="p-2"><MyButton id={e.id}/></td>
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
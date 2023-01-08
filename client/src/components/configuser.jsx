import { Nav } from './Nav';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './sidebar';
import Footer from './footer';
import { useEffect,useRef} from 'react';
import { getuser,  deleteOneData,/* updateOneData  */} from '../app/Actions/action';
const Config = () => {
    const { message } = useSelector(state => state.msg);
    const { config } = useSelector(state => state.token);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    useEffect(() => {
        console.log(message)
        dispatch(getuser(token))
    }, [dispatch, token, message])
   
    function MyButton({id}) {
    
        const buttonEl = useRef(null);
        useEffect(() => {
            const currentButtonEl = buttonEl.current;
            const handleClick = () => {
                dispatch(deleteOneData(id,token))
              console.log(id);
            };
            currentButtonEl.addEventListener('click', handleClick);
        
           
          }, [id]);
    
      return <button className="btn btn-secundary"ref={buttonEl}>Eliminar</button>;
    }
    function Formupdate ({id}){
    return (
        <form action="">
            <input type="text" />
            <input type="submit" value="update" />
        </form>
    )
    }
    return (
        <>
            <Nav />
            <div className='flex flex-row justify-content-around'>
                <Sidebar ids={5} />
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Cambiar Rol</th>
                                <th>Eliminar Usurio</th>
                            </tr>
                            
                        </thead>
                            
                        
                        <tbody>
                            {config?.map(e =>
                                <tr key={e.id}>
                                    <td>
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={e.Avatar} alt="img" />
                                            </div>
                                        </label>
                                    </td>
                                    <td>{e.Nombre}</td>
                                    <td>{e.Email}</td>
                                    <td>
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
                                    <td><Formupdate id= {e.id}/></td>
                                    <td><MyButton id={e.id}/></td>
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
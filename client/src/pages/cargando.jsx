import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useAuth0} from '@auth0/auth0-react';
import {useNavigate } from "react-router-dom";
import { senduser } from '../app/Actions/action';
import Swal from 'sweetalert2';

const Cargar = () => {
const dispatch=useDispatch()
const token = localStorage.getItem('token')
let {user,logout}=useAuth0()
const navigate = useNavigate();
const gmail =/^[a-zA-Z]+@correo\.unicordoba\.edu\.co$/;


useEffect(()=>{
    if(user && gmail.test(user.email)){
        dispatch(senduser({email:user.email,password:user.nickname,Avatar:user.picture,Nombre:user.name}))
        mostrarAlerta(1)
        setTimeout(() => {
            window.location.href = "/";
        }, 5000)
     

    }else{
    
        mostrarAlerta(0)
    if(!token){
            logout({returnTo:window.location.origin})
        }
    }
},[])

    return (
        <>
        <div className="hero min-h-screen" id="bgi">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Cargando...</h1>
            <p className="mb-5">Espere un momento por favor...</p>
            </div>
        </div>
        </div>
        </>
    )
}
const mostrarAlerta = (num) => {
   if(num===1){
   /*  Swal.fire({
      title: 'listo',
      text: 'has iniciado sesion correctamente',
      icon:  'success',
    }); */
}else{
    Swal.fire({
        title: 'Advertencia',
        text: '¡Este coreo no es valido!',
        icon: 'error',
      });
}
  };
export default Cargar
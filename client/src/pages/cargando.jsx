import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useAuth0} from '@auth0/auth0-react';
import { senduser } from '../app/Actions/action';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cargar = () => {
const Navigate=useNavigate()
const dispatch=useDispatch()
let {user,logout}=useAuth0()
const gmail =/^[a-zA-Z]+@correo\.unicordoba\.edu\.co$/;

useEffect(()=>{
    if(user && gmail.test(user.email)){
        console.log(user)
        dispatch(senduser({email:user.email,password:user.nickname,Avatar:user.picture,Nombre:user.name}))
        setInterval(()=>{
            Navigate("/home")
        },2000)
    }else{
        mostrarAlerta()
        setInterval(()=>{
            logout({returnTo:window.location.origin})
        },5000)
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
const mostrarAlerta = () => {
    Swal.fire({
      title: 'Advertencia',
      text: '¡Este coreo no es valido!',
      icon: 'error',
      confirmButtonText: 'Aceptar' 
    });
  };
export default Cargar
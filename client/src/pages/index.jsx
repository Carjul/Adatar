import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { senduser, register } from '../app/Actions/action';
import Swal from 'sweetalert2';



const Init = () => {
  const { loginWithRedirect, logout, user } = useAuth0();
  const statelr = localStorage.getItem('statelr')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(state => state.token)
  const messages = useSelector(state => state.msg)


  addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
     localStorage.clear()
      logout({ returnTo: window.location.origin });
    }
  }) 

  if (statelr === 'true') {

  useEffect(() => {
    if (users.user.token) {
      navigate("/home")
    } else if (messages.message.msgApi === "Unauthorized") {
      mostrarAlerta(2, "usuario no registrado")
    }
    else if (!users.user.token && user) {
      dispatch(senduser({ email: user?.email, password: user?.nickname, Avatar: user?.picture, Nombre: user?.name }));
    }

  }, [user, users.user, messages.message, statelr])

  } else if (statelr === 'false') {
    useEffect(() => {
      if (messages.message.msg) {
        mostrarAlerta(1, messages.message.msg)
      }
      else if (!messages.message.msg && user) {
        dispatch(
          register({
            Nombre: user?.name, Email: user?.email, Password: user?.nickname, Avatar: user?.picture, rol: 'Visitante',

          })
        );
      }
    }, [user, messages.message, statelr])

  }


  return (
    <div className="hero min-h-screen" id="bgi">
      <div className="hero-overlay bg-opacity-60"></div>

      <div className="flex flex-col w-7/8 h-full bg-base-100 bg-opacity-10">
      <div className="hero-content text-center text-neutral-content">

          <div className="flex flex-col items-center w-3/4">
            <h1 className="mb-5 mt-20 text-5xl font-bold text-primary">ADATAR WEB</h1>
            <p className="pb-10 pr-5 pl-5 mt-5 text-base-100">
              Sistema de Gestión de Información ADATAR, Departamento de Informática Educativa, Universidad de Córdoba.
            </p>
            <div className="mt-20">

              <div className="pb-5">
                <button className="btn btn-outline btn-primary" onClick={() => { loginWithRedirect(), localStorage.setItem('statelr', true) }} >Iniciar Sesión</button>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-base-100">O</span>
              </div>
              <div className="pt-5">
                <button className="btn btn-outline btn-primary" onClick={() => { loginWithRedirect(), localStorage.setItem('statelr', false) }} >Registrarse</button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}


const mostrarAlerta = (num, msg) => {

  if (num === 1) {
    Swal.fire({
      title: 'listo',
      text: msg,
      icon: 'success',
    }).then(() => localStorage.removeItem('statelr'))
  }
  else if (num === 2) {
    Swal.fire({
      title: 'Advertencia',
      text: msg,
      icon: 'error',
    }).then(() => localStorage.removeItem('statelr'))
  }
  else {
    Swal.fire({
      title: 'Advertencia',
      text: '¡Este coreo no es valido!',
      icon: 'error',
    });
  }
};

export default Init

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { senduser, register } from '../app/Actions/action';
import Swal from 'sweetalert2';

const Cargar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const msg = localStorage.getItem('msg')
    let { user, logout } = useAuth0()

    const gmail = /^[a-zA-Z]+@correo\.unicordoba\.edu\.co$/;
    const [sentUser, setSentUser] = useState(false);
    const [sentRegister, setSentRegister] = useState(false);
    useEffect(() => {
        if (!msg) {
          if (user /* && gmail.test(user.email) */ && !sentUser) {
            dispatch(senduser({ email: user.email, password: user.nickname, Avatar: user.picture, Nombre: user.name }));
            setSentUser(true);
            mostrarAlerta(1);
            setTimeout(() => {
              navigate('/');
            }, 5000);
          } else if (!sentUser) {
            mostrarAlerta(2);
            logout({ returnTo: window.location.origin });
            localStorage.removeItem('msg');
            localStorage.removeItem('token');
          }
        }
      }, [user, gmail, dispatch, logout, token, msg, sentUser]);

      useEffect(() => {
        if (msg && !sentRegister) {
          localStorage.removeItem('msg');
          localStorage.removeItem('token');
          dispatch(
            register({
              Nombre: user.name,
              Email: user.email,
              Password: user.nickname,
              Avatar: user.picture,
              rol: 'Visitante',
            })
          );
          setSentRegister(true);
            mostrarAlerta(1);
          setTimeout(() => {
            navigate('/');
          }, 5000);
        }
      }, [msg, dispatch, user, sentRegister]);
    return (
        <>
            <div className="hero min-h-screen" id="bgi">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">

                        <div>
                            <h1 className="mb-5 text-5xl font-bold">Cargando...</h1>
                            <p className="mb-5">Espere un momento por favor...</p>
                            <progress className="progress progress-warning w-56 "></progress>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}



const mostrarAlerta = (num) => {

    if (num === 1) {
        Swal.fire({
            title: 'listo',
            text: 'correo valido',
            icon: 'success',
        });
    }
    else if (num === 2) {
        Swal.fire({
            title: 'Advertencia',
            text: '¡Este coreo no esta regitrado!',
            icon: 'error',
        });
    }
    else {
        Swal.fire({
            title: 'Advertencia',
            text: '¡Este coreo no es valido!',
            icon: 'error',
        });
    }
};
export default Cargar
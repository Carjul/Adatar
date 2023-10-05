import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { senduser, register } from '../app/Actions/action';
import Swal from 'sweetalert2';

var logincount=0;
var registercount=0;
const Cargar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const msg = localStorage.getItem('msg')
    let { user, logout } = useAuth0()

    const gmail = /^[a-zA-Z]+@correo\.unicordoba\.edu\.co$/;
   
    /* const [cod, setCod] = useState({ codigo: '', tipoUsuario: '' });
    const [errores, setErrores] = useState({});
    const handleChange = (event) => {
        const { id, value } = event.target;
        setCod({ ...cod, [id]: value });
    };

    const handleRadioChange = (event) => {
        const tipoUsuario = event.target.id;
        setCod({ ...cod, tipoUsuario });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const erroresFormulario = validarFormulario(cod);

        if (Object.keys(erroresFormulario).length === 0) {
            const codigoFormateado = formatearCodigo(cod.codigo);
            // Ahora puedes acceder al tipo de usuario y al código en el estado cod
            
            
            
           
            //limpiar Inputs
            setCod({ codigo: '', tipoUsuario: '' });
           
            console.log('Formulario válido');
            setTimeout(() => {
                localStorage.removeItem("msg")
                localStorage.removeItem("token")
                logout({ returnTo: window.location.origin })
            }, 3000);

        } else {
            // Mostrar los errores en el formulario
            setErrores(erroresFormulario);
            console.log('Formulario inválido');
            setTimeout(() => {
                setErrores({})
            }, 5000);
        }

    } */
    useEffect(() => {
        if (!msg ) {
            if (user /* && gmail.test(user.email) */) {
                if (logincount===0) {
                    dispatch(senduser({ email: user.email, password: user.nickname, Avatar: user.picture, Nombre: user.name }))
                    logincount=logincount+1;
                }
                mostrarAlerta(1)
                setTimeout(() => {
                    navigate('/')
                }, 5000)



            } else {
                mostrarAlerta(0)
                if (!token) {
                    logout({ returnTo: window.location.origin })
                }
            }
        }
    }, [user, gmail, dispatch, logout, token, msg])
    useEffect(() => {
        if (msg) {
            if(registercount===0){
                dispatch(register({
                    Nombre: user.name,
                    Email: user.email,
                    Password: user.nickname,
                    Avatar: user.picture,
                    rol: 'Visitante',
    
                }))
                registercount=registercount+1;
               localStorage.removeItem("msg")
            }
        }

    }, [msg, dispatch])
    return (
        <>
            <div className="hero min-h-screen" id="bgi">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        {/* 
                            <form className='flex flex-col' onSubmit={handleSubmit}>
                                <div className='flex flex-row'>
                                    <input
                                        type="radio"
                                        name="radio-2"
                                        className="radio radio-secondary mr-2"
                                        checked={cod.tipoUsuario === 'Docente'}
                                        id="Docente"
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor="Docente" className='text-xl'>Docente</label>
                                </div>
                                <br />
                                <div className='flex flex-row'>
                                    <input
                                        type="radio"
                                        name="radio-2"
                                        className="radio radio-secondary mr-2"
                                        checked={cod.tipoUsuario === 'Estudiante'}
                                        id="Estudiante"
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor="Estudiante" className='text-xl'>Estudiante</label>
                                </div>

                                {errores.tipoUsuario && <p className="text-red-500">{errores.tipoUsuario}</p>}
                                <br />
                                <label htmlFor="codigo" className='text-xl'>Codigo</label>
                                <input
                                    type="text"
                                    id="codigo"
                                    placeholder="Type code"
                                    className="input input-bordered input-secondary w-full max-w-xs"
                                    value={cod.codigo}
                                    onChange={handleChange}
                                />
                                {errores.codigo && <p className="text-red-500">{errores.codigo}</p>}
                                <input type="submit" value="Enviar" className="btn btn-secondary" />
                            </form>  */}

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

/* function validarFormulario(cod) {
    const errores = {};

    if (!cod.codigo) {
        errores.codigo = 'El campo de código es obligatorio.';
    }

    if (!cod.tipoUsuario) {
        errores.tipoUsuario = 'Debes seleccionar si es docente o estudiante.';
    }

    return errores;
}

function formatearCodigo(codigo) {
    // Eliminar guiones y espacios en blanco
    codigo = codigo.replace(/[-\s]/g, '');

    // Si el código está vacío, devolver 'P' seguido de ceros
    if (!codigo) {
        return 'P000000000';
    }

    // Si el código ya comienza con 'P', devolverlo sin cambios
    if (codigo.startsWith('P')) {
        return codigo;
    }

    // Agregar 'P' al principio y completar con ceros si es necesario
    const codigoFormateado = 'P' + codigo.padStart(9, '0');

    return codigoFormateado;
} */

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
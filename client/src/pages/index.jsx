import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";



const Init = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const msg = localStorage.getItem('msg')
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
     localStorage.clear()
      logout({ returnTo: window.location.origin });
    }
  }) 
  useEffect(() => {
    
    if (isAuthenticated && !token) {
      navigate("/validar")
  } else if (msg==="Login incorrecto") {
      navigate("/validar")
  }
   
  }, [isAuthenticated, token, msg])


  return (
    <div className="hero min-h-screen" id="bgi">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Bienvenido a ADATAR</h1>
          <p className="mb-5">El proyecto ADATAR adapta el proceso de descubrimiento de conocimiento en bases de datos (KDD) generando un sistema de análisis de datos académicos que permita lanzar alertas tempranas sobre retención académica.</p>
          {token && isAuthenticated? <Link to={"/home"}><button className="btn btn-outline btn-primary" >Home</button></Link> : null}
          {!isAuthenticated ? <button className="btn btn-outline btn-primary" onClick={() => loginWithRedirect()} >Iniciar sesión</button> : null}
        </div>
      </div>
    </div>
  )
}

export default Init

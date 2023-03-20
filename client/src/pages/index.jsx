import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Init = () => {
const { user }=useSelector(state=>state.token)
  return (
    <div className="hero min-h-screen" id="bgi">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Bienvenido a ADATAR</h1>
          <p className="mb-5">El proyecto ADATAR adapta el proceso de descubrimiento de conocimiento en bases de datos (KDD) generando un sistema de análisis de datos académicos que permita lanzar alertas tempranas sobre retención académica .</p>
          {user.token?<Link to="/home"><button className="btn btn-primary" >Home</button></Link>:<Link to="/login"><button className="btn btn-primary" >Iniciar sesión</button></Link>}

        </div>
      </div>
    </div>
  )
}

export default Init

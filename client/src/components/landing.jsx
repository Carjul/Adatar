import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { senduser } from "../app/Actions/action";
import {useDispatch, useSelector} from "react-redux";
import img from '../assets/img.jpg'
const Init = () => {
  const { loginWithRedirect, user } = useAuth0();

  const dispatch = useDispatch()
const data = useSelector(state => state.token)
 

  useEffect(() => {
    dispatch(senduser({ email: user?.email, password: user?.nickname, name: user?.name, picture: user?.picture, }))
  }, [dispatch, user])

  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url(${img})` }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hola</h1>
          <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          {data.user.token? <Link to="/home" className="btn btn-primary">Empezar</Link>:
            <button className="btn btn-primary" onClick={() => loginWithRedirect()}>Iniciar sesión</button>}
        </div>
      </div>
    </div>
  )
}

export default Init
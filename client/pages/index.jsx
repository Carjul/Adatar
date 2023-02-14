import Link from "next/link";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { senduser, loginApi} from "@/app/Actions/action";
const Init = () => {

const dispatch = useDispatch()
const data = useSelector(state => state.token)
const {auth0data} = useSelector(state => state.token)



useEffect(() => {
  dispatch(loginApi())
},[] )

 useEffect(() => {
    dispatch(senduser({ email: auth0data?.email, password: auth0data?.nickname, name: auth0data?.name, picture: auth0data?.picture, }))
  }, [dispatch,auth0data]) 

  return (
    <div className="hero min-h-screen" id="bgi">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Bienvenido a ADATAR</h1>
          <p className="mb-5">El proyecto ADATAR adapta el proceso de descubrimiento de conocimiento en bases de datos (KDD) generando un sistema de análisis de datos académicos que permita lanzar alertas tempranas sobre retención académica .</p>
          {data.user.token? <Link href="/home" className="btn btn-primary">Empezar</Link>:<Link href="/api/auth/login"><button className="btn btn-primary" >Iniciar sesión</button></Link>
            }
    

        </div>
      </div>
    </div>
  )
}

export default Init

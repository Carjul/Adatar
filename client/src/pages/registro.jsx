import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { senduser } from '../app/Actions/action';


const Registro = () => {
    return (<>
    <div className="hero min-h-screen bg-base-200">
    <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" name="email" className="input input-bordered" />
            </div>
        </div>
    </form>    
    </div>
    </>)
}
/* /^[\w.%+-]+@correo\.unicordoba\.edu\.co$/ */ //expresion regular para permitir correo de la universidad

export default Registro
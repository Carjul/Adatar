import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { senduser } from '../app/Actions/action';


const Registro = () => {
    return (<>
        <div className="hero min-h-screen bg-base-200">
            <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body ">
                    <div className="form-control mx-auto">
                        <label className="input-group input-group-md">
                            <span>MDddd</span>
                            <input type="text" placeholder="Type here" className="input input-bordered input-md" />
                        </label>
                        <label className="input-group input-group-md">
                            <span>MD</span>
                            <input type="text" placeholder="Type here" className="input input-bordered input-md" />
                        </label>
                        <label className="input-group input-group-md">
                            <span>MD</span>
                            <input type="text" placeholder="Type here" className="input input-bordered input-md" />
                        </label>
                        <label className="input-group input-group-md">
                            <span>MD</span>
                            <input type="text" placeholder="Type here" className="input input-bordered input-md" />
                        </label>
                        <label className="input-group input-group-md">
                            <span>MDdd</span>
                            <input type="text" placeholder="Type here" className="input input-bordered input-md" />
                        </label>
                    </div>
                </div>
            </form>
        </div>
    </>)
}
/* /^[\w.%+-]+@correo\.unicordoba\.edu\.co$/ */ //expresion regular para permitir correo de la universidad

export default Registro
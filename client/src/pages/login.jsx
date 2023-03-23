//login

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { senduser } from '../app/Actions/action';


export default function Login() {
    const { user }=useSelector(state=>state.token)
    const dispatch = useDispatch();
    const [obj, setObj] = React.useState({ email: "",password:""});

    const navigate = useNavigate();
    
    const EventUser = (e) => {
        setObj({
            ...obj,
            [e.target.name]: e.target.value
        })
    }
    console.log(user)

    const send = () => {
        dispatch(senduser(obj))
    }
    
    React.useEffect(() => {
        if(user.token){
            navigate('/home')
        }
    }, [user])
  
    return (
        <>
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" name="email" className="input input-bordered" onChange={EventUser}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input input-bordered" onChange={EventUser} />
          <label className="label">
            <Link to="#" className="label-text-alt link link-hover">Forgot password?</Link><Link to="/registro" className="label-text-alt link link-hover">Resgristrate</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={send}>Login</button>
        </div>
      </div>
    </div>
  </div>
</div>
        </>
    )
}
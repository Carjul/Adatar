import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react"; 
import { senduser } from "../app/Actions/action";
import { useSelector,useDispatch } from "react-redux";

const Init=()=>{
  const dispatch = useDispatch()
  
  const data= useSelector(state=>state.token)
 
  const { loginWithRedirect, user } = useAuth0();
  
useEffect(() => {
  dispatch(senduser({email:user?.email,password:user?.nickname,name:user?.name,picture:user?.picture,}))
},[dispatch, user])
    return(
        <div className="hero min-h-screen" style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      {user? <Link to="/home"className="btn btn-primary">Get Started</Link>:
      <button className="btn btn-primary" onClick={() => loginWithRedirect()}>Log In</button>}
    </div>
  </div>
</div>
    )
} 

export default Init
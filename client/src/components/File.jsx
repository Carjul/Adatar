import { Nav } from './Nav';
import { useState } from 'react';
import { postFile } from '../app/Actions/action';
import {useDispatch,useSelector} from 'react-redux'
import gif from '../assets/loading-11.gif'

const Upload=()=> {
const dispatch = useDispatch();
const mgs = useSelector(state => state.msg);
const [obj, setObj] = useState({});
const handlesummit=(e)=>{
  setObj({ ...obj,
     [e.target.name]: e.target.files[0]
    });
  }
  console.log(mgs)

  return (
   <div>
    <Nav/>
   
  
  <div className="card w-96 bg-base-100 shadow-xl">

  <div className="card-body items-center text-center">
  <h2 className="card-title">Subir Archivo</h2>
    <form onSubmit={e=>{
      e.preventDefault();
      dispatch(postFile(obj))
      }} className="form-control">
   
   <input type="file"  name="file" onChange={handlesummit}  className="file-input file-input-bordered file-input-primary w-full max-w-xs"/>
   <br />
      <button type="submit" className="btn btn-primary">Enviar</button>
    
  </form>
  
  
  </div>
</div>

<div className="hero min-h-screen" style={{ backgroundImage: `url(${gif})` }}></div>
  </div>
  )  
}

export default Upload
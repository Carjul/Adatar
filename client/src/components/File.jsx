import { Nav } from './Nav';
import Sidebar from './sidebar';
import { useEffect, useState, } from 'react';
import { postFile } from '../app/Actions/action';
import { useDispatch, useSelector } from 'react-redux'
import gif from '../assets/loading-2.gif'

const Upload = () => {
  const dispatch = useDispatch();
  const { message } = useSelector(state => state.msg);
  const [obj, setObj] = useState({});
  const [swich, setSwich] = useState(false)
  const handlesummit = (e) => {
    setObj({
      ...obj,
      [e.target.name]: e.target.files[0]
    });
  }
  useEffect(() => {
    setSwich(false)
  }, [message])
  return (
    <>
      <Nav />
      <div id='content' >
      <Sidebar props={2} />
      <div className='content'>
      {message === "database initialize" ? <div className="alert alert-success shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>El archivo ha sido guardado</span>
            </div>
          </div> : ""}
          {message === "Request failed with status code 500" ? <div className="alert alert-error shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Error! La tarea no fue completada</span>
            </div>
          </div> : ""}
        
      {swich ?
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${gif})` }}></div> :
        <div>
          
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Subir Archivo</h2>
              <form onSubmit={e => {
                e.preventDefault();
                dispatch(postFile(obj))
                setSwich(true)
              }} className="form-control">

                <input type="file" id='miInputFile' name="file" onChange={handlesummit} className="file-input file-input-bordered file-input-primary w-full max-w-xs" required />
                <br />
                <button type="submit" className="btn btn-primary" >Enviar</button>

              </form>
            </div>
          </div>
        </div>
      }
      </div>

      </div>
    </>
  )
}

export default Upload
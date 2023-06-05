import Nav from '../components/Nav';
import Sidebar from '../components/sidebar';
import { useEffect, useState, } from 'react';
import { postFile } from '../app/Actions/action';
import Footer from '../components/footer'
import { useDispatch, useSelector } from 'react-redux'
import { setMsg, setSwich } from '../app/FeatureSlices/MsgApi';




const Upload = () => {
  const dispatch = useDispatch();
  const { message, swich } = useSelector(state => state.msg);
  const token = localStorage.getItem('token')
  const [obj, setObj] = useState({});
  const [NotasPeriodo, setNotasPeriodo] = useState({corte:""});

  const handlesummit = (e) => {
    setObj({
      ...obj,
      [e.target.name]: e.target.files[0]
    });
  }
  const hadleSelect = (e) => {
    setNotasPeriodo({corte:e.target.value})
    console.log(NotasPeriodo)
  }
  if (swich && message) {
    dispatch(setSwich(false))
  }
  useEffect(() => {
    setTimeout(() => {
      dispatch(setMsg(""))
    }, 20000)

  }, [message, dispatch])

  return (
    <>


      <Nav />
      <div className='flex flex-row justify-content-around' >
        <Sidebar props={2} />
        <div className='flex flex-col items-center w-full h-full'>
          {message === "database initialize" ? <div className="alert alert-success shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{message}</span>
            </div>
          </div> : ""}
          {message === "Request failed with status code 500" || message === "nombre de la hoja incorrecto" ? <div className="alert alert-error shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{message}</span>
            </div>
          </div> : ""}

          {swich ?
            <div className="hero min-h-screen" id='gif'></div> :
            <div>

              <div className="flex-1 card w-auto bg-base-100 shadow-xl mt-10">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Subir Archivo</h2>
                  <form onSubmit={e => {
                    e.preventDefault();
                    dispatch(postFile(obj, token, NotasPeriodo?.corte))
                    dispatch(setSwich(true))
                    NotasPeriodo.corte=""
                  }} className="form-control">

                    <input type="file" id='miInputFile' name="file" onChange={handlesummit} className="file-input file-input-bordered file-input-primary w-full max-w-xs" required />
                    <br />
                    <select className="select select-primary select-sm max-w-xs" onChange={hadleSelect} value={NotasPeriodo.corte}>
                      <option defaultValue={""}>Selecionar corte de Notas</option>
                      <option value="Notas Primer Corte">Notas Primer Corte</option>
                      <option value="Notas segundo Corte">Notas segundo Corte</option>
                      <option value="Notas tercer Corte">Notas tercer Corte</option>

                    </select>

                    <br />
                    {NotasPeriodo.corte===""?<button disabled className="btn btn-primary" >Enviar</button>:<button type="submit" className="btn btn-primary" >Enviar</button>}

                  </form>
                </div>
              </div>
            </div>
          }
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Upload
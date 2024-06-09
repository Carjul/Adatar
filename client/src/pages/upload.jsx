import Nav from '../components/Nav';
import Sidebar from '../components/sidebar';
import { useEffect, useState, } from 'react';
import { postFile } from '../app/Actions/action';
import Footer from '../components/footer'
import { useDispatch, useSelector } from 'react-redux'
import { setMsg, setSwich } from '../app/FeatureSlices/MsgApi';
import Swal from 'sweetalert2';




const Upload = () => {
  const dispatch = useDispatch();
  const { message, swich } = useSelector(state => state.msg);
  const { navState } = useSelector(state => state.tema);
  const token = localStorage.getItem('token')
  const [obj, setObj] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handlesummit = (e) => {
    const newSelectedFile = e.target.files[0];
    if (newSelectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setSelectedFile(newSelectedFile);
      setObj({ ...obj, [e.target.name]: newSelectedFile });
    }
    else {
      Swal.fire({
        title: 'Advertencia',
        text: 'Solo se permiten archivos de Excel',
        icon: 'error',
        button: false,
        timer: 2000
      }).then(() => setSelectedFile(null))
    }
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(setMsg(""))
    }, 50000)
    if (swich && message) {
      dispatch(setSwich(false))
    }

  }, [message, swich, dispatch])

  return (
    <>


      <Nav />
      <div className='flex flex-row justify-content-around ' >
        {navState === 'menu' && <Sidebar props={2} />}
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
            <div className='flex mx-auto'>

              <div className="flex-1 card w-3/4 items-center bg-base-100 shadow-xl mt-10 mb-20">
                <div className="card-body flex  items-center text-center">
                  <h2 className="card-title">Subir Reporte ADATAR</h2>
                  <form onSubmit={e => {
                    e.preventDefault();
                    dispatch(postFile(obj, token, selectedFile.name))
                    dispatch(setSwich(true))
                    setSelectedFile(null);
                    document.getElementById('miInputFile').value = '';
                  }} className="form-control mt-5">

                    <input type="file" id='miInputFile' name="file" onChange={handlesummit} className="file-input file-input-bordered file-input-primary w-full max-w-xs mx-auto" required />
                    <br />
                    {selectedFile != null && <div class="flex flex-col mt-4 mx-auto w-full items-center">

                      <p class="flex flew-wrap text-gray-700"> {selectedFile?.name}</p>
                      <br />
                      <p class="flex flew-wrap text-gray-700"> Size {selectedFile?.size} bytes</p>

                    </div>
                    }
                    {/* <select className="select select-primary select-sm max-w-xs" disabled >
                      {selectedFile === null ? <option value="">Nombre del Periodo</option> :
                        <option value={selectedFile.name}>{selectedFile.name}</option>
                      }
                    </select>
 */}
                    <br />
                    <button type="submit" className="btn btn-primary" disabled={!selectedFile}>Enviar</button>

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
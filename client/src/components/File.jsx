import { useState } from "react"
import { Nav } from './Nav';

const Upload=()=> {
    const [File,setFile]= useState("")

  return (
   <div>
    <Nav/>
    <form onSubmit={e=>e.preventDefault()} className="form-control">
   <input type="text" value={File} onChange={e=>setFile(e.target.value)} />
   <label htmlFor="file">Subir Archivo</label>
   <input type="file" name="file" id="file" />
   <button type="submit">Enviar</button>
  </form></div>
  )  
}

export default Upload
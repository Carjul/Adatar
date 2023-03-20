import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { VscSymbolColor } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";
import { exit } from "../app/Actions/action";
import { useEffect } from "react";
import { setTheme } from "../app/FeatureSlices/Themes";



export default function Nav() {


  const { theme } = useSelector(state => state.tema);

  useEffect(() => {
    document.getElementById('root').setAttribute('data-theme', theme);
  }, [theme])

  const value = localStorage.getItem('Avatar')
  const dispatch = useDispatch();

  const datacolor = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"]

  const handlechange = (e) => {
    dispatch(setTheme(e.target.value));
  }
  const click = () => {
    exit()
    localStorage.clear()
    location.href = "/"
  }


  return (
    <div className="navbar bg-base-200 border-b border-base-300" >
      <div className="flex-1">
        <Link to={"/"} className="btn btn-outline btn-primary normal-case text-xl border-none">Adatar</Link>
      </div>
      <div className="flex-none gap-2 ">
        <VscSymbolColor />
        <select name="tema" id="tema" onChange={handlechange} className="select select-primary w-5px max-w-xs border-none">
          <option defaultValue={"Themes"}> Themes</option>
          {datacolor?.map(i =>
            <option key={i} value={i}>{i}</option>
          )}
        </select>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">

            <img src={ `${value}`} alt="Avatar" width={40} height={50}/>

            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 ">

            <li>
              <button onClick={click} className="hover:bg-accent">Cerrar sesión<span><MdLogout /></span></button>

            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}


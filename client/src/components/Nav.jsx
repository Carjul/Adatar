import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setTheme } from "../app/FeatureSlices/Themes";
import { VscSymbolColor} from "react-icons/vsc";
import { useAuth0 } from "@auth0/auth0-react";

export function Nav() {
  const {logout,user} = useAuth0();

  const { theme } = useSelector(state => state.tema);

  document.getElementById('root').setAttribute('data-theme', theme);


  const dispatch = useDispatch();

  const datacolor = ["cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter","light", "dark"]

  const handlechange = (e) => {
    dispatch(setTheme(e.target.value));
  }
  return (
    <div className="navbar bg-base-200 border-b border-base-300" >
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">Adatar</Link>
      </div>
      <div className="flex-none gap-2 ">
          <VscSymbolColor />
        <select name="tema" id="tema" onChange={handlechange} className="select select-primary w-5px max-w-xs border-none">
          <option defaultValue={"Themes"}> Themes</option>
          {datacolor?.map(i =>
            <option  key={i} value={i}>{i}</option>
          )}
        </select>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={`${user.picture}`} alt="img" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link to={""} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
              <Link to={"/"} onClick={()=>logout()} className="justify-between">
                Logout
                <span className="badge">X</span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}


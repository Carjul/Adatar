import { Link } from "react-router-dom";
import { MdOutlineHome, MdFileUpload } from "react-icons/md";

const Sidebar = (number) => {
    let { props } = number;

    return (
        <div className="nav  z-10 bg-base-200 border-r border-base-300">
            <div className="flex-1">
                <div className="flex  overflow-hidden  flex-col flex-grow justify-content-start px-4 mt-5 h-100">
                    <ul>
                        <li>{props === 1 ? <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/home"}>
                            < MdOutlineHome />
                            <span className="ml-4 hidden md:flex md:flex-shrink-0"> Home</span>
                        </Link> : <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/home"}>
                            < MdOutlineHome />
                            <span className="ml-4 hidden md:flex md:flex-shrink-0"> Home</span>
                        </Link>}
                        </li>
                        <li>
                            {props === 2 ? <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/upload"}>
                                <MdFileUpload />
                                <span className="ml-4 hidden md:flex md:flex-shrink-0">Upload</span>
                            </Link> : <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/upload"}>
                                <MdFileUpload />
                                <span className="ml-4 hidden md:flex md:flex-shrink-0">Upload</span>
                            </Link>}
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Sidebar;
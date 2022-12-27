import { Link } from "react-router-dom";
import { MdOutlineHome,MdFileUpload } from "react-icons/md";

const Sidebar=(number)=>{
    let {props}=number;
   
return(
    <div className="flex overflow-hidden">
    <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 h-100">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-base-200 border-r border-base-300">
                
                <div className="flex flex-col flex-grow px-4 mt-5">
                    <nav className="flex-1 space-y-1 bg-base-200">
                        <ul>
                            <li>{props ===1 ? <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                        < MdOutlineHome /> 
                                    <span className="ml-4"> Home</span>
                                </Link>:<Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                         < MdOutlineHome /> 
                                    <span className="ml-4"> Home</span>
                                </Link>}
                            </li>
                            <li>
                                {props ===2 ? <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/upload"}>
                                        <MdFileUpload/>
                                    <span className="ml-4">Upload</span>
                                </Link>:<Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/upload"}>
                                        <MdFileUpload/>
                                    <span className="ml-4">Upload</span>
                                </Link>}
                            </li>
                            <li>
                                <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    <span className="ml-4">User</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span className="ml-4">Settings</span></Link>
                            </li>
                        
                            <li>
                                <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                    </svg>
                                    <span className="ml-4"> Tasks</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    <span className="ml-4"> Reports</span>
                                </Link>
                            </li>
                            <li>
                                <Link className="inline-flex items-center w-full px-4 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/home"}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                                    </svg>
                                    <span className="ml-4"> Dashboard</span>
                                    </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
 
</div>
)
}

export default Sidebar;
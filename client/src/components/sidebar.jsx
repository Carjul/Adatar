import { Link } from "react-router-dom";
import { MdOutlineHome, MdFileUpload, MdAccountCircle } from "react-icons/md";
import { TbBrandCakephp } from "react-icons/tb";
import { TfiBarChartAlt } from "react-icons/tfi";
import { GoGraph, GoTools, GoProject } from "react-icons/go";
import { PiChartBarHorizontalDuotone } from "react-icons/pi";
import { setgraficos } from "../app/FeatureSlices/interuptor/suiche"
import { useDispatch, useSelector } from 'react-redux';



const Sidebar = (number) => {
    const dispatch = useDispatch();
    const { Interuptor } = useSelector(state => state.interuptor);

    let { props } = number;
    const rol = localStorage.getItem('RolId');
    if (rol === '1') {
        return (
            <div className="nav z-10 bg-base-200 border-r border-base-300" >
                <div className="flex-1 ">
                    <div id="sidebar" className="flex overflow-hidden flex-col flex-grow justify-content-start  mt-5 h-100 w-auto">
                        <ul className="w-auto">
                            <li>{props === 1 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                < MdOutlineHome />
                                <span className="ml-4 hidden md:flex md:flex-shrink-0"> Home</span>
                            </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                < MdOutlineHome />
                                <span className="ml-4 hidden md:flex md:flex-shrink-0"> Home</span>
                            </Link>}
                            </li>
                            <li>
                                {props === 2 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/upload"}>
                                    <MdFileUpload />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Upload</span>
                                </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/upload"}>
                                    <MdFileUpload />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Upload</span>
                                </Link>}
                            </li>
                            <li>
                                {props === 3 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/perfil"}>
                                    <MdAccountCircle />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Perfil</span>
                                </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/perfil"}>
                                    <MdAccountCircle />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Perfil</span>
                                </Link>}
                            </li>
                            <li>
                                <ul className="menu bg-base-200 w-auto rounded-box">
                                    {props === 4 ? <>
                                        <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/dashboard"}>
                                            <GoGraph />
                                            <span className="ml-4 hidden md:flex md:flex-shrink-0">Graficos</span>
                                        </Link>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(1));

                                            }
                                        } className={` ${Interuptor.graficos1 ? 'rounded-lg bg-info mt-0.5' : ''}`}
                                        >
                                            <a><TbBrandCakephp /><span className="hidden md:flex md:flex-shrink-0">Rango Notas</span></a>
                                        </li>

                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(2));
                                            }
                                        } className={` ${Interuptor.graficos2 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><TbBrandCakephp /><span className="hidden md:flex md:flex-shrink-0">Rango Programa</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(3));
                                            }
                                        } className={` ${Interuptor.graficos3 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a> <GoProject /><span className="hidden md:flex md:flex-shrink-0">Rango Semestres</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(4));
                                            }
                                        } className={` ${Interuptor.graficos4 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><TfiBarChartAlt /><span className="hidden md:flex md:flex-shrink-0">Notas Semestre</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(5));
                                            }
                                        } className={` ${Interuptor.graficos5 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><PiChartBarHorizontalDuotone /><span className="hidden md:flex md:flex-shrink-0">Materias</span></a>
                                        </li>


                                    </> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/dashboard"}>
                                        <GoGraph />
                                        <span className="ml-4 hidden md:flex md:flex-shrink-0">Graficos</span>
                                    </Link>}
                                </ul>

                            </li>
                            <li>
                                {props === 5 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/config"}>
                                    <GoTools />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Configuración</span>
                                </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/config"}>
                                    <GoTools />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Configuración</span>
                                </Link>}
                            </li>

                        </ul>
                    </div>
                </div>

            </div>
        )
    }
    if (rol === '2') {
        return (
            <div className="nav z-10 bg-base-200 border-r border-base-300" >
                <div className="flex-1 ">
                    <div id="sidebar" className="flex  overflow-hidden  flex-col flex-grow justify-content-start mt-5">
                        <ul>
                            <li>{props === 1 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                < MdOutlineHome />
                                <span className="ml-4 hidden md:flex md:flex-shrink-0"> Home</span>
                            </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                < MdOutlineHome />
                                <span className="ml-4 hidden md:flex md:flex-shrink-0"> Home</span>
                            </Link>}
                            </li>
                            <li>
                                {props === 2 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/upload"}>
                                    <MdFileUpload />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Upload</span>
                                </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/upload"}>
                                    <MdFileUpload />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Upload</span>
                                </Link>}
                            </li>
                            <li>
                                {props === 3 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/perfil"}>
                                    <MdAccountCircle />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Perfil</span>
                                </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/perfil"}>
                                    <MdAccountCircle />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Perfil</span>
                                </Link>}
                            </li>
                            <li>
                                <ul >
                                    {props === 4 ? <>
                                        <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/dashboard"}>
                                            <GoGraph />
                                            <span className="ml-4 hidden md:flex md:flex-shrink-0">Graficos</span>
                                        </Link>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(1));

                                            }
                                        } className={` ${Interuptor.graficos1 ? 'rounded-lg bg-info mt-0.5' : ''}`}
                                        >
                                            <a><TbBrandCakephp /><span className="hidden md:flex md:flex-shrink-0">Rango Notas</span></a>
                                        </li>

                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(2));
                                            }
                                        } className={` ${Interuptor.graficos2 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><TbBrandCakephp /><span className="hidden md:flex md:flex-shrink-0">Rango Programa</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(3));
                                            }
                                        } className={` ${Interuptor.graficos3 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a> <GoProject /><span className="hidden md:flex md:flex-shrink-0">Rango Semestres</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(4));
                                            }
                                        } className={` ${Interuptor.graficos4 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><TfiBarChartAlt /><span className="hidden md:flex md:flex-shrink-0">Notas Semestre</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(5));
                                            }
                                        } className={` ${Interuptor.graficos5 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><PiChartBarHorizontalDuotone /><span className="hidden md:flex md:flex-shrink-0">Materias</span></a>
                                        </li>


                                    </> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/dashboard"}>
                                        <GoGraph />
                                        <span className="ml-4 hidden md:flex md:flex-shrink-0">Graficos</span>
                                    </Link>}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        )
    }

    if (rol === '3') {
        return (
            <div className="nav z-10 bg-base-200 border-r border-base-300 w-auto" >
                <div className="flex-1 ">
                    <div id="sidebar" className="flex  overflow-hidden  flex-col flex-grow justify-content-start  mt-5 h-100">
                        <ul>
                            <li>{props === 1 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                < MdOutlineHome />
                                <span className="ml-4 hidden md:flex md:flex-shrink-0"> Home</span>
                            </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                < MdOutlineHome />
                                <span className="ml-4 hidden md:flex md:flex-shrink-0"> Home</span>
                            </Link>}
                            </li>

                            <li>
                                {props === 3 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/perfil"}>
                                    <MdAccountCircle />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Perfil</span>
                                </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/perfil"}>
                                    <MdAccountCircle />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Perfil</span>
                                </Link>}
                            </li>
                            <li>
                                <ul className="menu bg-base-200 w-auto rounded-box">
                                    {props === 4 ? <>
                                        <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/dashboard"}>
                                            <GoGraph />
                                            <span className="ml-4 hidden md:flex mx-8 md:flex-shrink-0">Graficos</span>
                                        </Link>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(1));

                                            }
                                        } className={` ${Interuptor.graficos1 ? 'rounded-lg bg-info mt-0.5' : ''}`}
                                        >
                                            <a><TbBrandCakephp /><span className="hidden md:flex md:flex-shrink-0">Rango Notas</span></a>
                                        </li>

                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(2));
                                            }
                                        } className={` ${Interuptor.graficos2 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><TbBrandCakephp /><span className="hidden md:flex md:flex-shrink-0">Rango Programa</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(3));
                                            }
                                        } className={` ${Interuptor.graficos3 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a> <GoProject /><span className="hidden md:flex md:flex-shrink-0">Rango Semestres</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(4));
                                            }
                                        } className={` ${Interuptor.graficos4 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><TfiBarChartAlt /><span className="hidden md:flex md:flex-shrink-0">Notas Semestre</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(5));
                                            }
                                        } className={` ${Interuptor.graficos5 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><PiChartBarHorizontalDuotone /><span className="hidden md:flex md:flex-shrink-0">Materias</span></a>
                                        </li>


                                    </> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/dashboard"}>
                                        <GoGraph />
                                        <span className="ml-4 hidden md:flex md:flex-shrink-0">Graficos</span>
                                    </Link>}
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>

            </div>
        )
    }
    if (rol === '4') {
        return (
            <div className="nav z-10 bg-base-200 border-r border-base-300" >
                <div className="flex-1 ">
                    <div id="sidebar" className="flex  overflow-hidden  flex-col flex-grow justify-content-start mt-5 h-100">
                        <ul>
                            <li>{props === 1 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                < MdOutlineHome />
                                <span className="ml-4 hidden md:flex md:flex-shrink-0"> Home</span>
                            </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                < MdOutlineHome />
                                <span className="ml-4 hidden md:flex md:flex-shrink-0"> Home</span>
                            </Link>}
                            </li>

                            <li>
                                {props === 3 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/perfil"}>
                                    <MdAccountCircle />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Perfil</span>
                                </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/perfil"}>
                                    <MdAccountCircle />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Perfil</span>
                                </Link>}
                            </li>


                        </ul>
                    </div>
                </div>

            </div>
        )
    }
    if (rol === '5') {
        return (
            <div className="nav z-10 bg-base-200 border-r border-base-300" >
                <div className="flex-1 ">
                    <div id="sidebar" className="flex  overflow-hidden  flex-col flex-grow justify-content-start mt-5 h-100">
                        <ul>
                            <li>{props === 1 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                < MdOutlineHome />
                                <span className="ml-4 hidden md:flex md:flex-shrink-0"> Home</span>
                            </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-100 transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/home"}>
                                < MdOutlineHome />
                                <span className="ml-4 hidden md:flex md:flex-shrink-0"> Home</span>
                            </Link>}
                            </li>

                            <li>
                                {props === 3 ? <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg bg-primary focus:shadow-outline hover:bg-base-300" to={"/perfil"}>
                                    <MdAccountCircle />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Perfil</span>
                                </Link> : <Link className="inline-flex items-center w-full px-5 py-2 mt-1 text-xl text-bg-base-content transition duration-500 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-base-300" to={"/perfil"}>
                                    <MdAccountCircle />
                                    <span className="ml-4 hidden md:flex md:flex-shrink-0">Perfil</span>
                                </Link>}
                            </li>


                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

export default Sidebar;
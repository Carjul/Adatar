import { Link } from "react-router-dom";
import { MdOutlineHome, MdFileUpload, MdAccountCircle } from "react-icons/md";
import { GoGraph, GoTools } from "react-icons/go";
import { setgraficos } from "../app/FeatureSlices/interuptor/suiche"
import { useDispatch, useSelector } from 'react-redux';



const Sidebar = (number) => {
    const dispatch = useDispatch();
    const { Interuptor } = useSelector(state => state.intruptor);

    let { props } = number;
    const rol = localStorage.getItem('RolId');
    if (rol === '1') {
        return (
            <div className="nav z-10 bg-base-200 border-r border-base-300" >
                <div className="flex-1">
                    <div id="sidebar" className="flex  overflow-hidden  flex-col flex-grow justify-content-start px-4 mt-5 h-100">
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
                                <ul className="menu bg-base-200 w-56 rounded-box">
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
                                            <a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 1</span></a>
                                        </li>

                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(2));
                                            }
                                        } className={` ${Interuptor.graficos2 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 2</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(3));
                                            }
                                        } className={` ${Interuptor.graficos3 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 3</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(4));
                                            }
                                        } className={` ${Interuptor.graficos4 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 4</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(5));
                                            }
                                        } className={` ${Interuptor.graficos5 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 5</span></a>
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
                <div className="flex-1">
                    <div id="sidebar" className="flex  overflow-hidden  flex-col flex-grow justify-content-start px-4 mt-5">
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
                                            <a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 1</span></a>
                                        </li>

                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(2));
                                            }
                                        } className={` ${Interuptor.graficos2 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 2</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(3));
                                            }
                                        } className={` ${Interuptor.graficos3 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 3</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(4));
                                            }
                                        } className={` ${Interuptor.graficos4 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 4</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(5));
                                            }
                                        } className={` ${Interuptor.graficos5 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 5</span></a>
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
            <div className="nav z-10 bg-base-200 border-r border-base-300" >
                <div className="flex-1">
                    <div id="sidebar" className="flex  overflow-hidden  flex-col flex-grow justify-content-start px-4 mt-5 h-100">
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
                                <ul className="menu bg-base-200 w-56 rounded-box">
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
                                            <a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 1</span></a>
                                        </li>

                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(2));
                                            }
                                        } className={` ${Interuptor.graficos2 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 2</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(3));
                                            }
                                        } className={` ${Interuptor.graficos3 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 3</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(4));
                                            }
                                        } className={` ${Interuptor.graficos4 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 4</span></a>
                                        </li>
                                        <li onClick={
                                            () => {
                                                dispatch(setgraficos(5));
                                            }
                                        } className={` ${Interuptor.graficos5 ? 'rounded-lg bg-info mt-0.5' : ''}`} >
                                            <a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg><span className="hidden md:flex md:flex-shrink-0">Grafico 5</span></a>
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
                <div className="flex-1">
                    <div id="sidebar" className="flex  overflow-hidden  flex-col flex-grow justify-content-start px-4 mt-5 h-100">
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
                <div className="flex-1">
                    <div id="sidebar" className="flex  overflow-hidden  flex-col flex-grow justify-content-start px-4 mt-5 h-100">
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
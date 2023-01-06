import Footer from "./footer";
import { Nav } from "./Nav";
import Sidebar from "./sidebar";

const Perfil = () => {
    let rol = localStorage.getItem('RolId');
    let email = localStorage.getItem('Email');
    let name = localStorage.getItem('Name');
    let avatar = localStorage.getItem('Avatar');
    return (
        <div>

            <Nav />
            <div className='flex flex-row justify-content-around'>
                <Sidebar props={3} />
                <div className='flex flex-col items-center w-full h-full'>

                    <div className="card card-compact w-a bg-base-100 shadow-xl ">
                    
                        <div className="card-body">
                            <h1 className="card-title">Perfil</h1>
                            <br />
                            <img  className="mask mask-circle" src={`${avatar}`} alt="img" />
                            <h3>{name}</h3>
                            <strong>{email}</strong>
                            <br />

                            {parseInt(rol) === 1 ? <div className="card-actions justify-start">
                            <div className="badge badge-outline bg-secondary">Administrador</div>
                            </div> : ""}
                            {parseInt(rol) === 2 ? <div className="card-actions justify-start">
                            <div className="badge badge-outline bg-secondary">Directivo</div>
                            </div> : ""}
                            {parseInt(rol) === 3 ? <div className="card-actions justify-start">
                            <div className="badge badge-outline bg-secondary">Coordinador</div>
                            </div> : ""}
                            <br />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Perfil
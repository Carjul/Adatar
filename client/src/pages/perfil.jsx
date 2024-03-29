import Footer from "../components/footer";
import  Nav  from "../components/Nav";
import Sidebar from "../components/sidebar";



 
 
const Perfil = () => {

    let rol = localStorage.getItem('RolId');
    let email = localStorage.getItem('Email');
    let name = localStorage.getItem('Name');
    let avatar =localStorage.getItem('Avatar');

    return (
        <div>
        
     
            <Nav />
            <div className='flex flex-row justify-content-around'>
                <Sidebar props={3} />
                <div className='flex flex-col items-center w-full h-full'>

                    <div className="card card-compact w-a bg-base-100 shadow-xl ">
                    
                        <div className="card-body items-center">
                            <h1 className="card-title">Datos de usuario</h1>
                            <br />
                            <img src={avatar} alt="Avatar" loading="lazy" width={180} height={180} className="border rounded-full"  />
                            <h3>{name}</h3>
                            <strong>{email}</strong>
                            <br />

                            {parseInt(rol) === 1 ? <div className="card-actions justify-start">
                            <div className="badge badge-outline bg-info">Administrador</div>
                            </div> : ""}
                            {parseInt(rol) === 2 ? <div className="card-actions justify-start">
                            <div className="badge badge-outline bg-info">Directivo</div>
                            </div> : ""}
                            {parseInt(rol) === 3 ? <div className="card-actions justify-start">
                            <div className="badge badge-outline bg-info">Coordinador de semestre</div>
                            </div> : ""}
                            {parseInt(rol) === 4 ? <div className="card-actions justify-start">
                            <div className="badge badge-outline bg-info">Docente</div>
                            </div> : ""}
                            {parseInt(rol) === 5 ? <div className="card-actions justify-start">
                            <div className="badge badge-outline bg-info">Estudiante</div>
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
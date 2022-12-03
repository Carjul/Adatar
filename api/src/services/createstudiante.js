const { Op } = require("sequelize");
const { Estudiantes,Pensums } = require("../db");
 
const  crearstudent= async(params)=>{
   for (let i = 0; i < params.length; i++) {
    const {id,
        TipoDoc,
        Identificacion,
        Nombres,
        EstadoAlumnoPrograma,
        Semestre,
        Direccion,
        Ciudad,
        Departamento,
        TelFijo,
        TelMovil,
        Email,
        Genero,
        SemeNumero,
        Pensum, 
        Semestres, }  = params[i];
    
   const existe = await Estudiantes.findOne({
        where: {
           Identificacion:`${Identificacion}`,
        }
   })
    

if (!existe) {
    const pensum = await Pensums.findOne({
        where:{
            [Op.and]:[{Pensum},{Semestres:`${Semestres}`}]	
        }
    })    

    const estudiante = await Estudiantes.create({
        id,
        TipoDoc,
        Identificacion:`${Identificacion}`,
        Nombres,
        EstadoAlumnoPrograma,
        Semestre,
        Direccion,
        Ciudad,
        Departamento,
        TelFijo:`${TelFijo}`,
        TelMovil:`${TelMovil}`,
        Email,
        Genero,
        SemeNumero: `${SemeNumero}`,
    })

    pensum.addEstudiante(estudiante)   
   }

   
}
return "saved student";    
}


module.exports =crearstudent ;
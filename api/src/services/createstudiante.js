const { Op } = require("sequelize");
const { Estudiantes, Pensums } = require("../db");

const crearstudent = async (params) => {
    try {
        for (let i = 0; i < params.length; i++) {
            const { id,
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
                Semestres, } = params[i];


            const pensum = await Pensums.findOne({
                where: {
                    [Op.and]: [{ Pensum }, { Semestres: `${Semestres}` }]
                }
            })

            await Estudiantes.findOrCreate({
                where: {
                    Identificacion: `${Identificacion}`
                },
                defaults: {
                    id,
                    TipoDoc,
                    Identificacion: `${Identificacion}`,
                    Nombres,
                    EstadoAlumnoPrograma,
                    Semestre,
                    Direccion,
                    Ciudad,
                    Departamento,
                    TelFijo: `${TelFijo}`,
                    TelMovil: `${TelMovil}`,
                    Email,
                    Genero,
                    SemeNumero: `${SemeNumero}`,
                    PensumId: pensum.id
                }
            })




        }
        return "saved student";
    } catch (error) {
        console.log(error)
    }
}


module.exports = crearstudent;
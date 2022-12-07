const { Op } = require("sequelize");
const {Materias } = require("../db");

const createMaterias= async(params)=>{
    try {
        for (let i = 0; i < params.length; i++) {
            const {CodigoMateria,NombreMateria,TipoMateria}= params[i]

            const existe = await Materias.findOne({
                where: {
                    [Op.and]: [{ NombreMateria }, { CodigoMateria: `${CodigoMateria}` }]
                }
            })
            
            if(!existe){
                
                await Materias.create({
                        CodigoMateria:`${CodigoMateria}`,
                        NombreMateria,
                        TipoMateria
                })

            }
        }
    
        return "saved materias";
    } catch (error) {
        console.log(error)
    }
}

module.exports = createMaterias;


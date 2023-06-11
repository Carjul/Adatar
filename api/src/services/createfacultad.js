const { db} = require("../db");

const crearfacultad = async (params) => {
try {
    
    for (let i = 0; i < params.length; i++) {
        const { NombreFacultad } = params[i]
        const facultades = await db.query(`SELECT * FROM public."Facultades" WHERE "NombreFacultad" = $1`, [NombreFacultad]);
        if (facultades.rows.length === 0) {
        await db.query(`INSERT INTO public."Facultades"("NombreFacultad") VALUES ($1)`, [NombreFacultad]);
        }
    }
    return "saved facultades";
} catch (error) {
    console.log(error)
}
}

module.exports = crearfacultad;
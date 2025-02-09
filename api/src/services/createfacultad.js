const { db } = require("../db/db.js");

const crearfacultad = async (params) => {
    try {


        const { NombreFacultad } = params
        const facultades = await db.query(`SELECT * FROM public."Facultades" WHERE "NombreFacultad" = $1`, [NombreFacultad]);
        if (facultades.rows.length === 0) {
            await db.query(`INSERT INTO public."Facultades"("NombreFacultad") VALUES ($1)`, [NombreFacultad]);
        }

       
    } catch (error) {
        console.log(error)
    }
}

module.exports = crearfacultad;
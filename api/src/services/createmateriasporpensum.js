const { db} = require("../db/db.js");


const createMateriaspensun = async (params) => {
    try {
        
            const { NombreMateria, CodigoMateria, Pensum, SemMateriaNum, Seme } = params;

            const pensum = await db.query(`SELECT * FROM public."Pensums" WHERE "Pensum" = $1`, [Pensum]);
            const materia = await db.query(`SELECT * FROM public."Materias" WHERE "NombreMateria" = $1 AND "CodigoMateria" = $2`, [NombreMateria, CodigoMateria]);

            if (pensum.rows.length !== 0 && materia.rows.length !== 0) {
                const existe = await db.query(
                    `SELECT * FROM public."MateriaPorPensums" WHERE "SemMateriaNum" = $1 AND "Seme" = $2 AND "PensumId" = $3 AND "MateriaId" = $4`,
                    [SemMateriaNum, Seme, pensum.rows[0].id, materia.rows[0].id]
                );

                if (existe.rows.length === 0) {
                    await db.query(
                        `INSERT INTO public."MateriaPorPensums"("SemMateriaNum", "Seme", "PensumId", "MateriaId") VALUES ($1, $2, $3, $4)`,
                        [SemMateriaNum, Seme, pensum.rows[0].id, materia.rows[0].id]
                    );
                }
        }

      
    } catch (error) {
        console.log(error);
    }
};


module.exports = createMateriaspensun;
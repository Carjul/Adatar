const { Router } = require("express");
const { db } = require('../db/db.js');

const rutaregistro = Router();

rutaregistro.post('/registro', async (req, res) => {
    try {
        const { Nombre, Email, Password, Avatar, rol } = req.body;

        const ROL = await db.query(`SELECT * FROM public."Rols" WHERE "rol" = $1`, [rol]);

        if (ROL.rows.length !== 0) {
            const RolId = ROL.rows[0].id;
            const existingUser = await db.query(`SELECT * FROM public."Users" WHERE "Email" = $1`, [Email]);

            if (existingUser.rows.length === 0) {
                const newUser = await db.query(`INSERT INTO public."Users"(
                    "Avatar", "Nombre", "Email", "Password", "RolId" )
                    VALUES ($1, $2, $3, $4, $5) RETURNING *`, [Avatar, Nombre, Email, Password, RolId]);

                res.json({ msg: "usuario registrado" }); 
            } else {
                res.json({ msg: "ya existe el usuario" });
            }
        } else {
            res.status(404).json({ msg: "error" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ msg: "Internal Server Error" }); 
    }
});

module.exports = {
    rutaregistro
};

const { Router } = require("express");
const { db } = require('../db');
const jwt = require('jsonwebtoken');

const rutaregistro = Router()

rutaregistro.post('/registro', async (req, res) => {
    var newUser;
    const { Nombre, Email, Password, Avatar, rol } = req.body


    const ROL = await db.query(`SELECT * FROM public."Rols" WHERE "rol" = $1`, [rol]);

    if (ROL.rows.length !== 0) {
        var RolId = ROL.rows[0].id
        const existingUser = await db.query(`SELECT * FROM public."Users" WHERE "Email" = $1`, [Email]);
        if (existingUser.rows.length === 0) {
            newUser = await db.query(`INSERT INTO public."Users"(
                "Avatar", "Nombre", "Email", "Password","RolId" )
               VALUES ($1, $2, $3, $4, $5) RETURNING *`, [Avatar, Nombre, Email, Password, RolId]);
        }else{
            console.log("ya existe el usuario")
        }

    } else {
        console.log("no existe el rol")
    }

    if (newUser) {
        const token = jwt.sign({ user: newUser }, 'top_secret')

        res.json({ token: token })
    }
    else {
        res.status(404).json({ msg: "error" })
    }


})

module.exports = {
    rutaregistro
}
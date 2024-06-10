const { Router } = require("express");
const { db } = require('../db');


const usuario = Router()

usuario.put('/usuario', async (req, res) => {
    const { id, Datos } = req.body
    if (!id) {
        res.status(404).json({ msg: "error" })
    } else {
        await db.query(`UPDATE public."Users" SET "Datos"= $1 WHERE "id" = $2 `, [Datos, id])
        res.json({ msg: "Datos de usuario actualizado" })
    }
}
)
usuario.put('/ElminarDataUsuario', async (req, res) => {
    const { id} = req.body
    if (!id) {
        res.status(404).json({ msg: "error" })
    } else {
        await db.query(`UPDATE public."Users" SET "Datos"= $1 WHERE "id" = $2 `, [null, id])
        res.json({ msg: "Datos de usuario eliminado" })
    }
}

)
usuario.get('/usuario/:id', async (req, res) => {
    const { id } = req.params

    if (!id) {
        res.status(404).json({ msg: "error" })
    } else {
        const user = await db.query(`SELECT * FROM public."Users" WHERE "id" = $1`, [id]);
        res.json(user.rows[0])
    }
})

module.exports = {
    usuario
}
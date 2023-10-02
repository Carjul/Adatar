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

module.exports = {
    usuario
}
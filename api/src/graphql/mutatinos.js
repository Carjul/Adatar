const { GraphQLString, GraphQLID, GraphQLList } = require('graphql');
const { db} = require('./../db');
const { facultades, programas, pensums, materias, materiaPorPensums, estudiantes, docentes, periodoAcademico, notas } = require('./types');


const update = {
    type: GraphQLString,
    description: 'actualiza rol',
    args: {
        id: { type: GraphQLID },
        RolId: { type: GraphQLID }
    },
    async resolve(_, args) {
        const { id, RolId } = args
        await db.query(`UPDATE Users SET "RolId"=${RolId} WHERE id=${id}`)
        return 'usuario actualizado'
    }
}
const deleteuser = {
    type: GraphQLString,
    description: 'eliminar user',
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args
        await db.query(`DELETE FROM Users WHERE id=${id}`)
        return 'usuario eliminado'
    }
}

const create_rol = {
    type: GraphQLString,
    description: 'crear rol',
    args: {
        rol: { type: GraphQLString }
    },
    async resolve(_, args) {
        const { rol } = args

        const roles = await db.query(`SELECT * FROM "Rols" WHERE rol='${rol}'`)

        if (roles.length > 0) {
            return "rol ya existe"
        } else {
            await db.query(`INSERT INTO "Rols" (rol) VALUES ('${rol}')`)
            return "rol creado"
        }
    }
}

const delete_rol = {
    type: GraphQLString,
    description: 'eliminar rol',
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args
        await db.query(`DELETE FROM Rols WHERE id=${id}`)
        return 'rol eliminado'
    }
}

const Buscar_notas = {
    type: notas,
    description: 'buscar nota',
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args
        const data = await db.query(`SELECT * FROM Notas WHERE id=${id}`)
        return data
    }


}
const notasporyear = {
    type: new GraphQLList(notas),
    description: 'buscar nota por año',
    args: {
        PeriodoAcademicoId: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { PeriodoAcademicoId } = args
        const data = await db.query(`SELECT * FROM notas WHERE "PeriodoAcademicoId"=${PeriodoAcademicoId}`)
        return data
    }


}
const Buscar_periodoAcademico = {
    type: periodoAcademico,
    description: 'buscar periodoAcademico',
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args
        const data = await db.query(`SELECT * FROM "PeriodoAcademico" WHERE id=${id}`)
        return data
    }

}

const Buscar_docentes = {
    type: docentes,
    description: 'buscar docentes',
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args
        const data = await db.query(`SELECT * FROM Docentes WHERE id=${id}`)
        return data
    }
}

const Buscar_estudiantes = {
    type: estudiantes,
    description: 'buscar estudiantes',
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args
        const data = await db.query(`SELECT * FROM Estudiantes WHERE id=${id}`)
        return data
    }
}

const Buscar_materiaPorPensums = {
    type: materiaPorPensums,
    description: 'buscar materiaPorPensums',
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args
        const data = await db.query(`SELECT * FROM "MateriaPorPensums" WHERE id=${id}`)
        return data
    }
}

const Buscar_materias = {
    type: materias,
    description: 'buscar materias',
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args
        const data = await db.query(`SELECT * FROM Materias WHERE id=${id}`)
        return data
    }
}

const Buscar_pensums = {
    type: pensums,
    description: 'buscar pensums',
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args
        const data = await db.query(`SELECT * FROM Pensums WHERE id=${id}`)
        return data
    }
}

const Buscar_programas = {
    type: programas,
    description: 'buscar programas',
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args
        const data = await db.query(`SELECT * FROM Programas WHERE id=${id}`)
        return data
    }
}
const Buscar_programas_sede = {
    type: new GraphQLList(programas),
    description: 'buscar programas sede',
    args: {
        Sede: { type: GraphQLString },
    },
    async resolve(_, args) {
        const { Sede } = args
        const data = await db.query(`SELECT * FROM Programas WHERE sede='${Sede}'`)
        return data
    }
}
const Buscar_facultades = {
    type: facultades,
    description: 'buscar facultades',
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args
        const data =  await db.query(`SELECT * FROM Facultades WHERE id=${id}`)
        return data
    }
}

module.exports = { create_rol,delete_rol,Buscar_programas_sede, update, deleteuser, Buscar_notas, Buscar_periodoAcademico, Buscar_docentes, Buscar_estudiantes, Buscar_materiaPorPensums, Buscar_materias, Buscar_pensums, Buscar_programas, Buscar_facultades, notasporyear }
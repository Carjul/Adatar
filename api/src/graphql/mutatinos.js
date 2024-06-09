const { GraphQLString, GraphQLID, GraphQLList } = require('graphql');
const { db} = require('./../db');
const { facultades, programas, pensums, materias, materiaPorPensums, estudiantes, docentes, periodoAcademico, notas } = require('./types');



const update = {
    type: GraphQLString,
    description: 'actualiza rol',
    args: {
        id: { type: GraphQLID },
        RolId: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id, RolId, Datos } = args
        console.log("---",Datos)
        await db.query(`UPDATE public."Users"
        SET  "RolId"=${RolId} WHERE id=${id} `)
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
        await db.query(`DELETE FROM "Users" WHERE id=${id}`)
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
        await db.query(`DELETE FROM  public."Rols" WHERE id=${id}`)
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
        const data = await db.query(`SELECT * FROM  public."Notas" WHERE id=${id}`)
        return data.rows
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
        const data = await db.query(`SELECT * FROM  public."Notas" WHERE "PeriodoAcademicoId"=${PeriodoAcademicoId}`)
        return data.rows
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
        const data = await db.query(`SELECT * FROM public."PeriodoAcademico" WHERE id=${id}`)
        return data.rows
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
        const data = await db.query(`SELECT * FROM public."Docentes" WHERE id=${id}`)
        return data.rows
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
        const data = await db.query(`SELECT * FROM public."Estudiantes" WHERE id=${id}`)
        return data.rows
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
        const data = await db.query(`SELECT * FROM public."MateriaPorPensums" WHERE id=${id}`)
        return data.rows
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
        const data = await db.query(`SELECT * FROM  public."Materias" WHERE id=${id}`)
        return data.rows
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
        const data = await db.query(`SELECT * FROM  public."Pensums" WHERE id=${id}`)
        return data.rows
    }
}

const Buscar_programas = {
    type: new GraphQLList(programas),
    description: 'buscar programas',
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, args) {
        const { id } = args
        const data = await db.query(`SELECT * FROM  public."Programas" WHERE id=${id}`)
        return data.rows
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
        const data = await db.query(`SELECT * FROM public."Programas" WHERE "Sede"=$1`,[Sede])
        return data.rows
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
        const data =  await db.query(`SELECT * FROM  public."Facultades" WHERE id=${id}`)
        return data.rows
    }
}

module.exports = { create_rol,delete_rol,Buscar_programas_sede,Buscar_programas, update, deleteuser, Buscar_notas, Buscar_periodoAcademico, Buscar_docentes, Buscar_estudiantes, Buscar_materiaPorPensums, Buscar_materias, Buscar_pensums, Buscar_facultades, notasporyear }
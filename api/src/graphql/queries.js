const { GraphQLList } = require('graphql')
const { db} = require('./../db/db.js');
const {dataUser, facultades, programas, pensums, materias,materiaPorPensums,estudiantes,docentes,periodoAcademico,notas,Roles} = require('./types');

const peticion_user = {
    type: new GraphQLList(dataUser),
    async resolve() {
        const users = await db.query(
            `SELECT * FROM public."Users" `
        ) 
        return users.rows
    }
}

const peticion_rol = {
    type: new GraphQLList(Roles),
    async resolve() {
        const data = await db.query(
            `SELECT * FROM public."Rols" `
        ) 
        return data.rows
    }
}

const peticion_facultad = {
    type: new GraphQLList(facultades),
    async resolve() {
        const data = await db.query(
            `SELECT * FROM public."Facultades" `
        ) 
        return data.rows
    }
}

const peticion_programa = {
    type: new GraphQLList(programas),
    async resolve() {
        const data = await db.query(
            `SELECT * FROM public."Programas" `
        ) 
        return data.rows
    }
}

const peticion_pensum = {
    type: new GraphQLList(pensums),
    async resolve() {
        const data = await db.query(
            `SELECT * FROM public."Pensums" `
        ) 
        return data.rows
    }
}

const peticion_materias = {
    type: new GraphQLList(materias),
    async resolve() {
        const data = await db.query(
            `SELECT * FROM public."Materias" `
        )
        return data.rows
    }
}

 const peticion_materiaPorPensums = {
    type: new GraphQLList(materiaPorPensums),
    async resolve() {
        const data = await db.query(
            `SELECT * FROM public."MateriaPorPensums" `
        ) 
        return data.rows
    }
}

const peticion_estudiantes = {
    type: new GraphQLList(estudiantes),
    async resolve() {
        const data = await db.query(
            `SELECT * FROM public."Estudiantes" `
        ) 
        return data.rows
    }
}
 
const peticion_docentes = {
    type: new GraphQLList(docentes),
    async resolve() {
        const data = await db.query(
            `SELECT * FROM public."Docentes" `
        )
        return data.rows
    }  
}

const peticion_periodoAcademico = {
    type: new GraphQLList(periodoAcademico),
    async resolve() {
        const data = await db.query(
            `SELECT * FROM public."PeriodoAcademicos"`
        ) 
        return data.rows
    }
}

const peticion_notas = {
    type: new GraphQLList(notas),
    async resolve() {
        const data = await db.query(
            `SELECT * FROM public."Notas" `
        )
        return data.rows
    }
} 
 
module.exports = {peticion_rol, peticion_user,peticion_facultad,peticion_programa,peticion_pensum,peticion_materias,  peticion_materiaPorPensums,peticion_estudiantes, peticion_docentes,peticion_periodoAcademico,peticion_notas }
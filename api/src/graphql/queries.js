const { GraphQLList } = require('graphql')
const { Notas,Estudiantes,Pensums,Materias,Programas,Docentes, PeriodoAcademicos,MateriaPorPensums,Facultades,Users,Rols} = require('./../db');
const {dataUser, facultades, programas, pensums, materias,materiaPorPensums,estudiantes,docentes,periodoAcademico,notas,Roles} = require('./types');

const peticion_user = {
    type: new GraphQLList(dataUser),
    async resolve() {
        const users = await Users.findAll()
        return users
    }
}

const peticion_rol = {
    type: new GraphQLList(Roles),
    async resolve() {
        const data = await Rols.findAll()
        return data
    }
}

const peticion_facultad = {
    type: new GraphQLList(facultades),
    async resolve() {
        const data = await Facultades.findAll()
        return data
    }
}

const peticion_programa = {
    type: new GraphQLList(programas),
    async resolve() {
        const data = await Programas.findAll()
        return data
    }
}

const peticion_pensum = {
    type: new GraphQLList(pensums),
    async resolve() {
        const data = await Pensums.findAll()
        return data
    }
}

const peticion_materias = {
    type: new GraphQLList(materias),
    async resolve() {
        const data = await Materias.findAll()
        return data
    }
}

 const peticion_materiaPorPensums = {
    type: new GraphQLList(materiaPorPensums),
    async resolve() {
        const data = await MateriaPorPensums.findAll()
        return data
    }
}

const peticion_estudiantes = {
    type: new GraphQLList(estudiantes),
    async resolve() {
        const data = await Estudiantes.findAll()
        return data
    }
}
 
const peticion_docentes = {
    type: new GraphQLList(docentes),
    async resolve() {
        const data = await Docentes.findAll()
        return data
    }  
}

const peticion_periodoAcademico = {
    type: new GraphQLList(periodoAcademico),
    async resolve() {
        const data = await PeriodoAcademicos.findAll()
        return data
    }
}

const peticion_notas = {
    type: new GraphQLList(notas),
    async resolve() {
        const data = await Notas.findAll()
        return data
    }
} 
 
module.exports = {peticion_rol, peticion_user,peticion_facultad,peticion_programa,peticion_pensum,peticion_materias,  peticion_materiaPorPensums,peticion_estudiantes, peticion_docentes,peticion_periodoAcademico,peticion_notas }
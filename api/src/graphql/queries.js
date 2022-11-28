const { GraphQLList } = require('graphql')
const { Users,Facultades,Programas,Pensums } = require('./../db');
const { dataUser,facultades,programas,pensums } = require('./types');

const peticion = {
    type: new GraphQLList(dataUser),
    async resolve() {
        const users = await Users.findAll()
        return users
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

module.exports = { peticion,peticion_facultad,peticion_programa,peticion_pensum }
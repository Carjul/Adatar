const { GraphQLList } = require('graphql')
const { Users } = require('./../db');
const { dataUser } = require('./types');

const peticion = {
    type: new GraphQLList(dataUser),
    async resolve() {
        const users = await Users.findAll()
        return users
    }
}

module.exports = { peticion }
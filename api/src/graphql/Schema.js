const {GraphQLSchema,GraphQLObjectType} = require('graphql')
const {peticion,peticion_facultad,peticion_programa,peticion_pensum}= require('./queries')
const {register}= require('./mutatinos')

const QueryType= new GraphQLObjectType({
name:'QueryType',
description:'la raiz de QueryType',
fields:{
    peticion,
    peticion_facultad,
    peticion_programa,
    peticion_pensum
}
})

const MutationType= new GraphQLObjectType({
    name:'MutationType',
    description:'la raiz de MutationType',
    fields:{
        register
    }
    })

module.exports = new GraphQLSchema({
    query:QueryType,
    mutation:MutationType
})


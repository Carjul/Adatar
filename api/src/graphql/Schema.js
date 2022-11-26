const {GraphQLSchema,GraphQLObjectType} = require('graphql')
const {peticion}= require('./queries')
const {register}= require('./mutatinos')

const QueryType= new GraphQLObjectType({
name:'QueryType',
description:'la raiz de QueryType',
fields:{
    peticion
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


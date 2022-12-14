const {GraphQLSchema,GraphQLObjectType} = require('graphql')
const {peticion_user,peticion_facultad,peticion_programa,peticion_pensum,peticion_materias,peticion_materiaPorPensums,peticion_estudiantes,peticion_docentes,peticion_periodoAcademico,peticion_notas }= require('./queries')
const {register}= require('./mutatinos')

const QueryType= new GraphQLObjectType({
name:'QueryType',
description:'la raiz de QueryType',
fields:{
    peticion_user,
    peticion_facultad,
    peticion_programa,
    peticion_pensum,
    peticion_materias,
    peticion_materiaPorPensums,
    peticion_estudiantes,
    peticion_docentes,
    peticion_periodoAcademico,
    peticion_notas,  
}
})

const MutationType= new GraphQLObjectType({
    name:'MutationType',
    description:'la raiz de MutationType',
    fields:{
        register,
      
    }
    })

module.exports = new GraphQLSchema({
    query:QueryType,
    mutation:MutationType
})


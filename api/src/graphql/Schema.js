const {GraphQLSchema,GraphQLObjectType} = require('graphql')
const {peticion_rol,peticion_user,peticion_facultad,peticion_programa,peticion_pensum,peticion_materias,peticion_materiaPorPensums,peticion_estudiantes,peticion_docentes,peticion_periodoAcademico,peticion_notas }= require('./queries')
const {create_rol,delete_rol,update,deleteuser,Buscar_notas,Buscar_periodoAcademico,Buscar_docentes,Buscar_estudiantes,Buscar_materiaPorPensums,Buscar_materias,Buscar_pensums,Buscar_programas,Buscar_facultades,notasporyear,Buscar_programas_sede}= require('./mutatinos')


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
    peticion_rol  
}
})

const MutationType= new GraphQLObjectType({
    name:'MutationType',
    description:'la raiz de MutationType',
    fields:{
        update,
        deleteuser,
        Buscar_notas,
        Buscar_periodoAcademico,
        Buscar_docentes,
        Buscar_estudiantes,
        Buscar_materiaPorPensums,
        Buscar_materias,
        Buscar_pensums,
        Buscar_programas,
        Buscar_facultades,
        notasporyear,
        Buscar_programas_sede,
        create_rol,
        delete_rol
    }
    })

module.exports = new GraphQLSchema({
    query:QueryType,
    mutation:MutationType
})


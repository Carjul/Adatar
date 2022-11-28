const {GraphQLObjectType,GraphQLString,GraphQLID}= require('graphql')

const dataUser =new GraphQLObjectType({
   name:'datauser',
   description:"datos de usuario",
   fields:{
    id:{type:GraphQLID},
    Nombre:{type:GraphQLString},
    Email: {type:GraphQLString},
    Password:{type:GraphQLString}
   }
})

const facultades =new GraphQLObjectType({
   name:'facultades',
   description:"datos facultad",
   fields:{
    Facultad_id: {type:GraphQLID},
    NombreFacultad: {type:GraphQLString},
    NombreCortoFacultad: {type:GraphQLString},
   }
})
const programas =new GraphQLObjectType({
   name:'programas',
   description:"datos por programa",
   fields:{
   Programa_id:{type:GraphQLID},
    Programa:{type:GraphQLString}, 
    NombreCorto:{type:GraphQLString},
    NombreMuyCorto:{type:GraphQLString},
    FacultadeFacultadId: {type:GraphQLID},
   
   }
   
})

const pensums =new GraphQLObjectType({
   name:'pensums',
   description:"datos pensums",
   fields:{
      Pensum_id:{type:GraphQLID}, 
      Pensum:{type:GraphQLString}, 
      Sesion:{type:GraphQLString},
      ProgramaProgramaId:{type:GraphQLID},
  
   }
})

module.exports={dataUser, facultades,programas,pensums}
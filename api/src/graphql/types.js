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

      id: {type:GraphQLID},
      NombreFacultad: {type:GraphQLString},
      createdAt: {type:GraphQLString},
      updatedAt: {type:GraphQLString},
   }
})
const programas =new GraphQLObjectType({
   name:'programas',
   description:"datos por programa",
   fields:{
    id:{type:GraphQLID},
    NombrePrograma:{type:GraphQLString}, 
    Sede:{type:GraphQLString},
    Sesion:{type:GraphQLString},
    createdAt:{type:GraphQLString},
    updatedAt:{type:GraphQLString},
    FacultadeId: {type:GraphQLID},
   
   }
   
})

const pensums =new GraphQLObjectType({
   name:'pensums',
   description:"datos pensums",
   fields:{
      id:{type:GraphQLID}, 
      Pensum:{type:GraphQLString}, 
      Semestres:{type:GraphQLString},
      ProgramaId:{type:GraphQLID},
  
   }
})

const materias = new GraphQLObjectType({
   name:'materias',
   description:'datos materias',
   fields:{
      id:{type:GraphQLID},
      CodigoMateria:{type:GraphQLString}, 
      NombreMateria:{type:GraphQLString},
      TipoMateria:{type:GraphQLString},
      PensumId:{type:GraphQLID},
   }
})

module.exports={dataUser, facultades,programas,pensums,materias}
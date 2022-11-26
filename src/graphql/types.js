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

module.exports={dataUser}
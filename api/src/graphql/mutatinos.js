const {GraphQLString} = require('graphql');
const { Users } = require('./../db');

const register={
    type:GraphQLString,
    description:'crear new user',
    args:{
     Nombre:{type:GraphQLString},
     Email:{type:GraphQLString},
     Password:{type:GraphQLString}
    },
    async resolve (_,args){ 
       const {Nombre,Email,Password} =args
        await Users.create({Nombre,Email,Password})
       return 'usuario creado'
    }
}

module.exports={register}
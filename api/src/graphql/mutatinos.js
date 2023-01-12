const {GraphQLString,GraphQLID,GraphQLList} = require('graphql');
const { Notas,Estudiantes,Pensums,Materias,Programas,Docentes, PeriodoAcademicos,MateriaPorPensums,Facultades,Users } = require('./../db');
const {facultades, programas, pensums, materias,materiaPorPensums,estudiantes,docentes,periodoAcademico,notas,} = require('./types');


const update={
    type:GraphQLString,
    description:'actualiza rol',
    args:{
     id:{type:GraphQLID},
     RolId:{type:GraphQLID}
    },
    async resolve (_,args){ 
       const {id, RolId} =args
       const user =await Users.findByPk(id)
       user.RolId=RolId
       await user.save()
       return 'usuario actualizado'
    }
}
const deleteuser={
    type:GraphQLString,
    description:'eliminar user',
    args:{
     id:{type:GraphQLID},
    },
    async resolve (_,args){ 
       const {id} =args
       await Users.destroy({
              where:{id}
       })
       return 'usuario eliminado'
    }
}
const Buscar_notas = {
    type:notas,
    description:'buscar nota',
    args:{
        id:{type:GraphQLID},
    },
    async resolve (_,args){
        const {id} =args
        const data = await Notas.findByPk(id)
        return data
    }


}
const notasporyear = {
    type:new GraphQLList(notas),
    description:'buscar nota por año',
    args:{
        PeriodoAcademicoId:{type:GraphQLID},
    },
    async resolve (_,args){
        const {PeriodoAcademicoId} =args
        const data = await Notas.findAll({
            where: {
                PeriodoAcademicoId
            }
          });
        return data
    }


}
const Buscar_periodoAcademico = {
    type:periodoAcademico,
    description:'buscar periodoAcademico',
    args:{
        id:{type:GraphQLID},
    },
    async resolve (_,args){
        const {id} =args
        const data = await PeriodoAcademicos.findByPk(id)
        return data
    }
    
}

const Buscar_docentes = {
    type:docentes,
    description:'buscar docentes',
    args:{
        id:{type:GraphQLID},
    },
    async resolve (_,args){
        const {id} =args
        const data = await Docentes.findByPk(id)
        return data
    }
}

const Buscar_estudiantes = {
    type:estudiantes,
    description:'buscar estudiantes',
    args:{
        id:{type:GraphQLID},
    },
    async resolve (_,args){
        const {id} =args
        const data = await Estudiantes.findByPk(id)
        return data
    }
}

const Buscar_materiaPorPensums = {
    type:materiaPorPensums,
    description:'buscar materiaPorPensums',
    args:{
        id:{type:GraphQLID},
    },
    async resolve (_,args){
        const {id} =args
        const data = await MateriaPorPensums.findByPk(id)
        return data
    }
}

const Buscar_materias = {
    type:materias,
    description:'buscar materias',
    args:{
        id:{type:GraphQLID},
    },
    async resolve (_,args){
        const {id} =args
        const data = await Materias.findByPk(id)
        return data
    }
}

const Buscar_pensums = {
    type:pensums,
    description:'buscar pensums',
    args:{
        id:{type:GraphQLID},
    },
    async resolve (_,args){
        const {id} =args
        const data = await Pensums.findByPk(id)
        return data
    }
}

const Buscar_programas = {
    type:programas,
    description:'buscar programas',
    args:{
        id:{type:GraphQLID},
    },
    async resolve (_,args){
        const {id} =args
        const data = await Programas.findByPk(id)
        return data
    }
}
const Buscar_programas_sede = {
    type:new GraphQLList(programas),
    description:'buscar programas sede',
    args:{
        Sede:{type:GraphQLString},
    },
    async resolve (_,args){
        const {Sede} =args
        const data = await Programas.findAll({
            where:{
                Sede
            }
        })
        return data
    }
}
const Buscar_facultades = {
    type:facultades,
    description:'buscar facultades',
    args:{
        id:{type:GraphQLID},
    },
    async resolve (_,args){
        const {id} =args
        const data = await Facultades.findByPk(id)
        return data
    }
}

module.exports={Buscar_programas_sede,update,deleteuser,Buscar_notas,Buscar_periodoAcademico,Buscar_docentes,Buscar_estudiantes,Buscar_materiaPorPensums,Buscar_materias,Buscar_pensums,Buscar_programas,Buscar_facultades,notasporyear }
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID,GraphQLList} = require('graphql')

const dataUser = new GraphQLObjectType({
   name: 'datauser',
   description: "datos de usuario",
   fields: {
      id: { type: GraphQLID },
      Nombre: { type: GraphQLString },
      Email: { type: GraphQLString },
      Password: { type: GraphQLString },
      Avatar: { type: GraphQLString },
      RolId: { type: GraphQLID }, 
      Datos: { type: new GraphQLList(GraphQLString) },
   }
})

const Roles = new GraphQLObjectType({
   name: 'rols',
   description: "datos de rol",
   fields: {
      id: { type: GraphQLID },
      rol: { type: GraphQLString },
   }
})

const facultades = new GraphQLObjectType({
   name: 'facultades',
   description: "datos facultad",
   fields: {

      id: { type: GraphQLID },
      NombreFacultad: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
   }
})
const programas = new GraphQLObjectType({
   name: 'programas',
   description: "datos por programa",
   fields: {
      id: { type: GraphQLID },
      NombrePrograma: { type: GraphQLString },
      Sede: { type: GraphQLString },
      Sesion: { type: GraphQLString },
      FacultadeId: { type: GraphQLID },
   }

})

const pensums = new GraphQLObjectType({
   name: 'pensums',
   description: "datos pensums",
   fields: {
      id: { type: GraphQLID },
      Pensum: { type: GraphQLString },
      Semestres: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
      ProgramaId: { type: GraphQLID },

   }
})

const materias = new GraphQLObjectType({
   name: 'materias',
   description: 'datos materias',
   fields: {
      id: { type: GraphQLID },
      CodigoMateria: { type: GraphQLString },
      NombreMateria: { type: GraphQLString },
      TipoMateria: { type: GraphQLString },
   }
})

const materiaPorPensums = new GraphQLObjectType({
   name: 'materiaPorPensums',
   description: 'datos materias por pensums',
   fields: {
      id: { type: GraphQLID },
      Seme: { type: GraphQLString },
      SemMateriaNum: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
      PensumId: { type: GraphQLID },
      MateriaId: { type: GraphQLID },
   }
})

const estudiantes = new GraphQLObjectType({
   name: 'estudiantes',
   description: 'datos estudiantes',
   fields: {
      id: { type: GraphQLID },
      TipoDoc: { type: GraphQLString },
      Identificacion: { type: GraphQLString },
      Nombres: { type: GraphQLString },
      EstadoAlumnoPrograma: { type: GraphQLString },
      Semestre: { type: GraphQLString },
      Direccion: { type: GraphQLString },
      Ciudad: { type: GraphQLString },
      Departamento: { type: GraphQLString },
      TelFijo: { type: GraphQLString },
      TelMovil: { type: GraphQLString },
      Email: { type: GraphQLString },
      Genero: { type: GraphQLString },
      SemeNumero: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
      PensumId: { type: GraphQLID },
   }
})


const docentes = new GraphQLObjectType({
   name: 'docentes',
   description: 'datos docentes',
   fields: {
      id: { type: GraphQLID },
      Cog_Docente: { type: GraphQLString },
      Nom_Docente: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
   }
})

const periodoAcademico = new GraphQLObjectType({
   name: 'PeriodoAcademico',
   description: 'datos PeriodoAcademico',
   fields: {
      id: { type: GraphQLID },
      Periodo: { type: GraphQLString },
      Year: { type:GraphQLInt },
      NomNotaPeriodo: { type: GraphQLString },
   }
})

const notas= new GraphQLObjectType({
   name: 'notas',
   description: 'datos notas',
   fields: {
   id: { type: GraphQLID },
   GRADE_ACTIVITY:{type:GraphQLString},
   FINAL_GRADE:{type:GraphQLString},
   Nota:{type:GraphQLString},
   Gano:{type:GraphQLInt},
   Perdio:{type:GraphQLInt},
   Rango:{type:GraphQLString},
   ProxNotaMin:{type:GraphQLString},
   Seccion:{type:GraphQLString},
   createdAt: { type: GraphQLString },
   updatedAt: { type: GraphQLString },
   EstudianteId:{type:GraphQLID},
   MateriaId: { type: GraphQLID},
   ProgramaId: { type: GraphQLID},
   DocenteId: { type: GraphQLID},
   PeriodoAcademicoId: { type: GraphQLID},
   }
}) 

module.exports = {Roles, dataUser, facultades, programas, pensums, materias, materiaPorPensums, estudiantes, docentes, periodoAcademico,notas}
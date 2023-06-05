
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');


const { DB_USER, DB_PASSWORD, DB_HOST, DB } = process.env;


  
//my sql
/*const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
  native: false,
  define: {
    timestamps: false
  },
  pool: {
    max: 50,
    min: 0,
    acquire: 1200000,
    idle: 1000000,
  } 
}); */
//postgres
 const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`, {
  logging: false,
  native: false,
  define: {
    timestamps: false
  },
  pool: {
    max: 50,
    min: 0,
    acquire: 1200000,
    idle: 1000000,
  }
}); 


const basename = path.basename(__filename);
const modelDefiners = [];


fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

//relaciones
const {
  Notas,
  Estudiantes,
  Pensums,
  Materias,
  Programas,
  Docentes,
  PeriodoAcademicos,
  MateriaPorPensums,
  Facultades,
  Rols,
  Users
} = sequelize.models;

Users.belongsTo(Rols)
Rols.hasMany(Users)

Notas.belongsTo(Estudiantes)
Estudiantes.hasMany(Notas)

Notas.belongsTo(Materias)
Materias.hasMany(Notas)

Notas.belongsTo(Programas)
Programas.hasMany(Notas)

Notas.belongsTo(Docentes)
Docentes.hasMany(Notas)

Notas.belongsTo(PeriodoAcademicos)
PeriodoAcademicos.hasMany(Notas)

Estudiantes.belongsTo(Pensums)
Pensums.hasMany(Estudiantes)

MateriaPorPensums.belongsTo(Pensums)
Pensums.hasMany(MateriaPorPensums)

MateriaPorPensums.belongsTo(Materias)
Materias.hasMany(MateriaPorPensums)

Programas.belongsTo(Facultades)
Facultades.hasMany(Programas)

Pensums.belongsTo(Programas)
Programas.hasMany(Pensums)


module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

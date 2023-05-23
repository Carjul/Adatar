const { Op } = require("sequelize");
const { Estudiantes, Pensums } = require("../db");

const crearstudent = async (params) => {
    try {
        for (let i = 0; i < params.length; i++) {
            const { id,
                TipoDoc,
                Identificacion,
                Nombres,
                EstadoAlumnoPrograma,
                Semestre,
                Direccion,
                Ciudad,
                Departamento,
                TelFijo,
                TelMovil,
                Email,
                Genero,
                SemeNumero,
                Pensum,
                Semestres, } = params[i];

            const existe = await Estudiantes.findOne({
                where: {
                    Identificacion: `${Identificacion}`
                }
            })

            if (!existe) {
                const pensum = await Pensums.findOne({
                    where: {
                        Pensum,
                    }
                })

                const estudiante = await Estudiantes.create({
                    people_code_id: id,
                    TipoDoc,
                    Identificacion: `${Identificacion}`,
                    Nombres,
                    EstadoAlumnoPrograma,
                    Semestre,
                    Direccion,
                    Ciudad,
                    Departamento,
                    TelFijo: `${TelFijo}`,
                    TelMovil: `${TelMovil}`,
                    Email,
                    Genero,
                    SemeNumero: `${SemeNumero}`,

                })

                pensum.addEstudiante(estudiante)
            }




        }
        return "saved student";
    } catch (error) {
        console.log(error)
    }
}


module.exports = crearstudent;
    /* 
    try {
        const client = new Client({
            connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`,
            ssl: false
          });
        
            client.connect((error) => {
            if (error) {
              console.error('Error al conectar a la base de datos:', error);
              return;
            }
            console.log('Conexión exitosa a la base de datos');
          });
        for (let i = 0; i < params.length; i++) {
            const { id,TipoDoc,Identificacion,Nombres,EstadoAlumnoPrograma,Semestre,Direccion,Ciudad,Departamento,TelFijo,TelMovil,Email,Genero,SemeNumero,Pensum,} = params[i];
          const result= await  client.query(`SELECT id FROM "Pensums"  WHERE "Pensum"=${Pensum}'`)
            const PensumId=result.length===0? 0:result.rows[0].id
           await client.query(`INSERT INTO "Estudiantes" (id,"TipoDoc","Identificacion","Nombres","EstadoAlumnoPrograma","Semestre","Direccion","Ciudad","Departamento","TelFijo","TelMovil","Email","Genero","SemeNumero","PensumId") VALUES (${id},'${TipoDoc}','${Identificacion}','${Nombres}','${EstadoAlumnoPrograma}','${Semestre}','${Direccion}','${Ciudad}','${Departamento}','${TelFijo}','${TelMovil}','${Email}','${Genero}','${SemeNumero}',${PensumId})`)
        }
        client.end((error) => {
            if (error) {
              console.error('Error al cerrar la conexión:', error);
              return;
            }
            console.log('Conexión cerrada correctamente');
          })
        return "saved student";
    } catch (error) {
        console.log(error)
    }
    */


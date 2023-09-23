const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { db } = require('../db')


const patron = /^[a-zA-Z]+@correo\.unicordoba\.edu\.co$/;

const obj= {
    id: 0,
    Avatar:null,
    Nombre: null,
    Email:null,
    Password: null,
    RolId: null,
    Cog_Docente: null,
    people_code_id: null
  }

passport.use(new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: 'password',
    },
    async (req, email, password, done) => {

        try {
            const busqueda = await db.query(`SELECT * FROM public."Users" WHERE "Email" = $1`, [email]);
            const user = busqueda.rows[0]

            if (busqueda.rows.length !== 0) {
                user.Password === password ? done(null, user) : done(null, false, { message: "contraseña incorrecta" })
            } else {
                if (patron.test(email)) {
                    const { Nombre, Avatar } = req.body
                      /*   const ROL = await db.query(`SELECT * FROM public."Rols" WHERE "rol" = $1`, ["Admin"]);
                        if (ROL.rows.length !== 0) {  
                        const newUser = await db.query(`INSERT INTO public."Users"("Avatar", "Nombre", "Email", "Password", "RolId") VALUES ($1, $2, $3, $4, $5) RETURNING *`, [Avatar, Nombre, email, password, ROL.rows[0].id]);
                    } */
                   
                    done(null,obj);

                } else {
                    done(null, false, { message: "el correo no pertenece a la universidad." })
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
));



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    if(id ===0){
        done(null, obj);
    }else{
        db.query(`SELECT * FROM "Users" WHERE id=${id}`)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(new Error(err));
        })
    }
    
});

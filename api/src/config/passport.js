const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { db } = require('../db')


// const patron = /^[a-zA-Z]+@correo\.unicordoba\.edu\.co$/;

// const obj = {
//     id: 0,
//     Avatar: null,
//     Nombre: null,
//     Email: null,
//     Password: null,
//     RolId: null,
//     Cog_Docente: null,
//     people_code_id: null
// }

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
                done(null, false, { message: "Usuario no registrado" });
            }

        } catch (error) {
            console.log("-->",error)
        }
    }
));



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    /*if (id === 0) {
        done(null, obj);
    } else {*/
        db.query(`SELECT * FROM "Users" WHERE id=${id}`)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(new Error(err));
            })
    // }

});

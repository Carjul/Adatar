const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require('../db')

passport.use(new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: 'password',
    }, async (req, email, password, done) => {
       
        try {
            const busqueda = await Users.findAll({
                where: { Email: email }
            })
            const user = busqueda[0]

            if (!user) {
                const { email, picture, name } = req.body;
                const usercreate = await Users.create({ Avatar: picture, Nombre: name, Email: email, Password: password, RolId: 3 });
                return done(null, usercreate);
            } else {
                user.Password === password ? done(null, user) : done(null, false)
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
    Users.findByPk(id).then((user) => {
        done(null, user);
    })
        .catch((err) => {
            done(new Error(err));
        })
});

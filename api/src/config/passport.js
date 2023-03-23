const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require('../db')

passport.use(new LocalStrategy(
    {
        usernameField: "email",
    }, async (email, password, done) => {

        try {
            const busqueda = await Users.findAll({
                where: { Email: email }
            })
            const user = busqueda[0]

            if (!user) {
                return done(null, false, { message: "Not User found." });
            } else {
                user.Password === password ? done(null, user) : done(null, false, { message: "Incorrect Password." })
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

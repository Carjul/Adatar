const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require('../db')

passport.use(new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: 'password',
    },
    async (req, email, password, done) => {
        try {
            const user = await Users.findOne({ where: { Email: email } })
            if (user) {
                user.password === password ? done(null, user) : done(null, false)
            }
            if (!user) {
                const { email, picture, name } = req.body;
                const usercreate = await Users.create({ Avatar: picture, Nombre: name, Email: email, Password: password, RolId: 2 });
                return done(null, usercreate);
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

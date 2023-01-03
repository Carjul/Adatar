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
        const user = await Users.findOne({ where: { Email: email } });
        if (user) {
            return done(null, user)
        }
        else {
            const { email, picture, name } = req.body;
            const create = await Users.create({ Avatar: picture,Nombre: name, Email: email, Password: password,  });
            return done(null, create);
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

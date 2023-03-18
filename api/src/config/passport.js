const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require('../db')

passport.use(new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: 'password',
    },(req, email, password, done) => {
        try {
           Users.findAll({ 
            where: { Email: email }
         }).then((user) => {
            const user1 = user[0];
                if (!user1) {
                    const { email, picture, name } = req.body;
                    const usercreate = Users.create({ Avatar: picture, Nombre: name, Email: email, Password: password, RolId: 3 });
                    return done(null, usercreate);
                }else {
                    user1.Password === password ? done(null, user1) : done(null, false)
                }
            })
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

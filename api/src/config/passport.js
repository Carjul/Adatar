const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require('../db')


const patron = /^[a-zA-Z]+@correo\.unicordoba\.edu\.co$/;
passport.use(new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: 'password',
    },
    async (req, email, password, done) => {

        try {
            const busqueda = await Users.findAll({
                where: { Email: email }
            })
            const user = busqueda[0]
 
            if(user){
                user.Password === password ? done(null, user) : done(null, false, { message: "contraseña incorrecta" })
            }else{
                if (patron.test(email)) {
                    const  { Nombre, Avatar} = req.body	
                    const newUser = await Users.findOrCreate({
                        where: { 
                            Avatar,
                            Nombre,
                            Email: email,
                            Password: password,
                            RolId:2 },
                        })
                    done(null, newUser)
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
    Users.findByPk(id).then((user) => {
        done(null, user);
    })
        .catch((err) => {
            done(new Error(err));
        })
});

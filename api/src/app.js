const express = require("express")
const path = require("path")
const passport = require('passport');
const cors = require("cors")
const session = require('express-session');
const { graphqlHTTP } = require('express-graphql')
require('./config/passport')
const {isAuthenticated} = require("./helper/index")
const { rutaUpload } = require("./routes/uploadFile")
const {routerLog} = require("./routes/login")
const {routerdes} = require("./routes/download")
const {rutaregistro} = require("./routes/registro")
const schema  = require("./graphql/Schema");
const { usuario } = require("./routes/usuario");

const app = express();

app.set('port', process.env.PORT)
app.use(session({secret: "secret",resave: true,saveUninitialized: true,}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use('/app/',routerLog)    
app.use('/app/',rutaregistro) 
app.use('/app/', usuario)
app.use('/app/', routerdes)
app.use('/app/api/v1',isAuthenticated, rutaUpload)
app.use('/app/api/v1',isAuthenticated, graphqlHTTP({ schema, graphiql:true }));   
app.use(cors());
  

module.exports= {app};  
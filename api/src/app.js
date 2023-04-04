const express=require( "express")
const {graphqlHTTP}= require('express-graphql')
const cors = require("cors")
const morgan = require("morgan")
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('./config/passport')
const {isAuthenticated} = require("./helper/index")
const { rutaUpload } = require("./routes/uploadFile")
const routerLog = require("./routes/login")
const { routerData } = require("./routes/data")
const schema  = require("./graphql/Schema")
const app = express()
require('./controllers/graficos') 

app.set('port', process.env.PORT)
app.use(session({secret: "secret",resave: true,saveUninitialized: true,}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'))
app.use(cors())
app.use(flash());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/', routerLog)
app.use('/',  routerData )
app.use('/api/v1', isAuthenticated,rutaUpload)
app.use('/api/v1', isAuthenticated, graphqlHTTP({ schema, graphiql:true }));




module.exports= app;
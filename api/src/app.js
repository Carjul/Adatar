const express=require( "express")
const {graphqlHTTP}= require('express-graphql')
const cors =require("cors")
const morgan =require("morgan")
const passport = require('passport');
const session = require('express-session');
require('./config/passport')
const {isAuthenticated} = require("./helper/index")
const { rutaUpload } = require("./routes/uploadFile")
const routerLog = require("./routes/login")
const schema  = require("./graphql/Schema")
const app = express()

app.set('port', process.env.PORT)
app.use(session({secret: "secret",resave: true,saveUninitialized: true,}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.use('/', routerLog)
app.use('/api/v1', isAuthenticated,rutaUpload)
app.use('/api/v1', isAuthenticated, graphqlHTTP({ schema, graphiql:true }));




module.exports= app;
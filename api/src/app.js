const express=require( "express")
const {graphqlHTTP}= require('express-graphql')
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('./config/passport')
const {isAuthenticated} = require("./helper/index")
const { rutaUpload } = require("./routes/uploadFile")
const {routerLog} = require("./routes/login")
const {routerdes} = require("./routes/download")
const {rutaregistro} = require("./routes/registro")
const schema  = require("./graphql/Schema");
const { usuario } = require("./routes/usuario");

const app = express();

const server = createServer(app);
const io = new Server(server);

app.set('port', process.env.PORT)
app.use(express.static(path.join(__dirname, './public')));
app.use(session({secret: "secret",resave: true,saveUninitialized: true,}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'))
app.use(cors())
app.use(flash());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
     
app.use('/app/',routerLog)    
app.use('/app/',rutaregistro) 
app.use('/app/', usuario)
app.use('/app/', routerdes)

app.use('/app/api/v1',isAuthenticated, rutaUpload)
app.use('/app/api/v1',isAuthenticated, graphqlHTTP({ schema, graphiql:true }));   
  
io.on('connection', (socket) => {  
    socket.on('message', (msg) => {
    console.log('message: ' + msg);
  });});

module.exports= app;  
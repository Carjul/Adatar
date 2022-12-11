const express=require( "express")
const {graphqlHTTP}= require('express-graphql')
const cors =require("cors")
const morgan =require("morgan");
const { rutaUpload } = require("./routes/uploadFile");
const schema  = require("./graphql/Schema");

const app = express()

app.set('port', process.env.PORT)

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.use('/',rutaUpload)
app.use('/', graphqlHTTP({ schema, graphiql:true }))




module.exports= app;
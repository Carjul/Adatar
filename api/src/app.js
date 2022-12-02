const express=require( "express")
const {graphqlHTTP}= require('express-graphql')
const cors =require("cors")
const morgan =require("morgan");
const { rutaUpload } = require("./routes/uploadFile");
const schema  = require("./graphql/Schema");


const app = express()
const {PORT}=process.env

app.set('port', PORT)
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',rutaUpload)
app.use('/', graphqlHTTP({
    schema:schema,
    graphiql:true
}))




module.exports= app;
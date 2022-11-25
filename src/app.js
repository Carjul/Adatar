const express=require( "express")
const cors =require("cors")
const morgan =require("morgan");
const { rutaUpload } = require("./routes/uploadFile");
require('dotenv').config();

const app = express()
const {PORT}=process.env

app.set('port', PORT)
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use('/',rutaUpload)



module.exports= app;
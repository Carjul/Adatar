const express=require( "express")
const cors =require("cors")
const morgan =require("morgan")
require('dotenv').config();

const app = express()
const {PORT}=process.env

app.set('port', PORT)
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())





module.exports= app;
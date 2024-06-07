const { Router } = require("express");
const upload = require("../config/multer");
const { UploadFile } = require("../controllers/ControllerUpload");


const rutaUpload= Router()

rutaUpload.post('/upload',upload,UploadFile)

module.exports={
    rutaUpload
}
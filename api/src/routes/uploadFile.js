const { Router } = require("express");
const upload = require("../config/multer");
const { UploadFile } = require("../controllers/ControllerUpload");
const { isAuthenticated } = require("../helper");

const rutaUpload= Router()

rutaUpload.post('/upload',isAuthenticated,upload,UploadFile)

module.exports={
    rutaUpload
}
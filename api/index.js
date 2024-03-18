
require('dotenv').config();
const { app, server } = require("./src/app.js");
const { db } = require('./src/db.js');
server.listen(app.get('port'), () => console.log(`serve run on port:${app.get('port')}`))
/* db.connect().then(e => console.log("Database " + e.database + " is connected")).catch(err => console.log(err)) */


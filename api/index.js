/* require('dotenv').config();
const { app } = require("./src/app.js");
const { db } = require('./src/db/db.js');

 db.connect()
 .then(e => console.log("Database ".concat(e.database).concat(" is connected")))
 .then(()=> app.listen(app.get('port'), () => console.log(`serve run on port:${app.get('port')}`)))
 .catch(err => console.log(err)) 

  */
require('dotenv').config();
const { app } = require("./src/app.js");
const { initDB } = require('./src/db/db.js');

const startServer = async () => {
  try {
    await initDB();
    
    app.listen(app.get('port'), () => {
      console.log(`Server running on port: ${app.get('port')}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
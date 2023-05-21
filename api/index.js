
require('dotenv').config();

const app= require("./src/app.js");
const{ conn }=require( './src/db.js');

app.listen(app.get('port'),()=>console.log(`serve run on port:${app.get('port')}`))

conn.sync({ force:false}).then(() => {
  
    console.log('db is connect');
 
})
.catch((err)=>{console.log(err)});


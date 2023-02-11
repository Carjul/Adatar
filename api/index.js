const app= require("./src/app.js");
const{ conn,Rols}=require( './src/db.js');

app.listen(app.get('port'),()=>console.log(`serve run on port:${app.get('port')}`))

conn.sync({ force:false}).then(() => {
  
    console.log('db is connect');
 
})
.catch((err)=>{console.log(err)});

(async()=>{
    const roles=["Admin","Directivo","Coordinador de semestre"]
    for(let i=0;i<roles.length;i++){
        const e =roles[i]
        await Rols.findOrCreate({
            where:{
                rol:e
            }
        })
    }

})();
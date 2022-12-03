const {MateriaPorPensums} = require("../db");


const createMateriaspensun= (params)=>{
for (let i = 0; i < params.length; i++) {
    const element = params[i];
    MateriaPorPensums.create(element)
}
return "Materias por pensum saved"
}

module.exports = createMateriaspensun;
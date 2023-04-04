const {Router} = require('express');
const {State} = require('../controllers/graficos');
const routerData = Router();

routerData.get('/data', (req, res) => {
   
    res.json({
        data: {
            sede: State.sede,
            xld:State.Programas_sede,
            xxx:State.notasperpro
        }
    })
})

module.exports ={ routerData };


const express = require('express')
const passport = require('passport')
const routerLog = express.Router()
const jwt = require('jsonwebtoken')



routerLog.post('/login', passport.authenticate("local"), (req, res) => {

  if (req.user.id !== 0) {
    const token = jwt.sign({ user: req.user }, 'top_secret')
    res.json({ token: token })
  } else {
    res.json({
      msgApi: "usuario no registrado"
    })
  }

});


routerLog.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ msg: "sesion cerrada" })
  });
});



module.exports = { routerLog } 
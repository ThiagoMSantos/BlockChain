const express = require("express");
const authMiddleware = require('../middlewares/auth')

const Carteira = require('../models/carteira')
const Moeda = require('../models/moeda')

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) =>{
  res.send({ cpfUsuario: req.userId });
});

router.get('/:cpfUsuario', async (req, res) =>{
  res.send({ cpfUsuario: req.userId });
})

module.exports = app => app.use('/dashboard', router);
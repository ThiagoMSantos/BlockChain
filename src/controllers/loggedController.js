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

router.post('/', async (req, res) =>{
  try {
    const carteira = await Carteira.create(req.body );

    return res.send({carteira});
  } catch (err) {
    return res.send({ds_mensagem:'Erro ao criar carteira.'})
  }

})

module.exports = app => app.use('/dashboard', router);
const express = require("express");
const authMiddleware = require('../middlewares/auth')

const Carteira = require('../models/carteira')
const Moeda = require('../models/moeda')

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) =>{
  try {
    const carteiras = await Carteira.find();

    return res.send({ carteiras });
  } catch (err) {
    return res.send({ds_mensagem:'Erro ao listar carteiras. Erro: '+err})
  }
});

router.get('/:cpfUsuario', async (req, res) =>{
  res.send({ cpfUsuario: req.userId });
})

router.post('/', async (req, res) =>{
  try {
    const carteira = await Carteira.create({...req.body, user: req.userId });

    return res.send({carteira});
  } catch (err) {
    return res.send({ds_mensagem:'Erro ao criar carteira. Erro: '+err})
  }

})

module.exports = app => app.use('/dashboard', router);
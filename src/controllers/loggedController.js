const express = require("express");
const authMiddleware = require('../middlewares/auth')

const BlockChain = require('../models/blockChain');

const router = express.Router();

router.use(authMiddleware);

const blockChain = new BlockChain();

router.post('/', async (req, res) =>{
  try {
    
    const { informacao } = req.body;

    blockChain.adicionarBloco({informacao});

    return res.send({ds_mensagem: 'Bloco Adicionado'});
  } catch (err) {
    return res.send({ds_mensagem:'Erro ao criar bloco.'})
  }

})

router.get('/', (req, res) =>{
  try {
    return res.send({ blockChain });

  } catch (err) {
    return res.send({ds_mensagem:'Erro ao listar BlockChain.'})
  }
});


module.exports = app => app.use('/blockchain', router);
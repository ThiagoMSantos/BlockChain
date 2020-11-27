const express = require("express");
const authMiddleware = require('../middlewares/auth')

const Usuario = require('../models/usuario')
const Carteira = require('../models/carteira')
const Moeda = require('../models/moeda')

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) =>{
  try {

    const carteiras = await Carteira.find().populate(['usuario', 'moedas']);

    return res.send({ carteiras });
  } catch (err) {
    return res.send({ds_mensagem:'Erro ao listar carteiras. Erro: '+err})
  }
});

router.get('/:usuarioId', async (req, res) =>{
  try {
    const carteira = await Carteira.find().populate(['usuario', 'moedas']);

    carteira.map(data=>{
      console.log(data);
      if(req.params.usuarioId == data.usuario._id){
        return res.send( data );
      }
    })

  } catch (err) {
    return res.send({ds_mensagem:'Erro ao listar carteira. Erro: '+err})
  }
})

router.post('/', async (req, res) =>{
  try {
    
    const { nome, moedas } = req.body;

    const carteira = await Carteira.create({nome, usuario: req.userId });

    await Promise.all(moedas.map(async moeda =>{
      const moedaCarteira = new Moeda({ ...moeda, carteira: carteira._id });
      await moedaCarteira.save();
      
      carteira.moedas.push(moedaCarteira);

    }));

    await carteira.save();

    return res.send({carteira});
  } catch (err) {
    return res.send({ds_mensagem:'Erro ao criar carteira. Erro: '+err})
  }

})

module.exports = app => app.use('/dashboard', router);
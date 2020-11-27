const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const router = express.Router();
const authConfig = require('../config/auth.json');

function generateToken(param = {}){
  return jwt.sign(param, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async(req, res) =>{
  const {cpf, email} = req.body;

  try{
    if (await Usuario.findOne({cpf}))
      return res.send({ic_sucesso: true, ds_mensagem: 'CPF já cadastrado.'});

    if (await Usuario.findOne({email}))
      return res.send({ic_sucesso: true, ds_mensagem: 'Email já cadastrado.'});
  
    const usuario = await Usuario.create(req.body);

    usuario.password = undefined;

    return res.send({
      usuario,
      token: generateToken({ id: usuario.cpf }),
      ds_mensagem:'Obrigado por utilizar nossa plataforma!',
      ic_sucesso: true
    });
  } catch(err){
    return res.send({
      ds_mensagem:'Não foi possivel realizar o cadastro!',
      ic_sucesso: true
    });
  }
});

router.post('/login', async(req, res) =>{
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({email}).select('+password');

  if(!usuario)
    return res.status(400).send({ic_sucesso: true, ds_mensagem: 'Usuario não encontrado'});

  if (!await bcrypt.compare(password, usuario.password))
    return res.status(400).send({ic_sucesso: true, ds_mensagem: 'Senha incorreta!'});

  usuario.password = undefined;

  const token = jwt.sign({ id: usuario.cpf }, authConfig.secret, {
    expiresIn: 86400,
  });

  res.send({ 
    usuario, 
    token: generateToken({ id: usuario.cpf }),
    ic_sucesso: true
  });
});

module.exports = app => app.use('/auth', router);
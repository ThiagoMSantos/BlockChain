const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) =>{
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.send({error: 'Token não informado.'})

  // Bearer + HASH
  const parts = authHeader.split(' ');

  if(!parts.length === 2 )
    return res.send({error: 'Token inválido.'});

  const [scheme, token] = parts;

  if(!/^Bearer$/i.test(scheme))
    return res.send({error: 'Formato do token inválido.'});

  jwt.verify(token, authConfig.secret, (err, decoded) =>{
    if (err) return res.send({error: 'Token inválido.'})

    req.userId = decoded.id;
    return next();
  });

};
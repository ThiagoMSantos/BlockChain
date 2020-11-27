const mongoose = require("../database");
const bcrypt = require('bcryptjs');

const CarteiraSchema = new mongoose.Schema({
  nome:{
    type: String,
    required: true,
  },
  usuario:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  moeda:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Moeda',
  }],
  createdAt:{
    type:Date,
    default:Date.now,
  },
});

const Carteira = mongoose.model('Carteira', CarteiraSchema);

module.exports = Carteira;

const mongoose = require("../database");
const bcrypt = require('bcryptjs');

const MoedaSchema = new mongoose.Schema({
  nome:{
    type: String,
    required: true,
  },
  qt:{
    type: Number,
    required: true,
    default:0,
  },
  carteira:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Carteira'
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
});

const Moeda = mongoose.model('Moeda', MoedaSchema);

module.exports = Moeda;

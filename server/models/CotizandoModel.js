const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CotizandoModelSchema = new Schema({
    rut:  { type: String , unique: true},
    nombres:  String,
    apellidos:  String,
    celular:  String,
    email:  { type: String , unique: true},
    pdf:  String,
    fecha:  String,
});

module.exports = mongoose.model('Cotizando', CotizandoModelSchema); 
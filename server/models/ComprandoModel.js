const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComprandoModelSchema = new Schema({
    rut:  { type: String , unique: true},
    nombres:  String,
    apellidos:  String,
    celular:  String,
    email:  { type: String , unique: true},
    concesionario:  String,
    tipo_persona:  String,
    pdf:  String,
    fecha:  String,
    firma: { type: Number, default: 0 }, 
});

module.exports = mongoose.model('Comprando', ComprandoModelSchema); 
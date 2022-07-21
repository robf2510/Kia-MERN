const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const CotizandoController = require('../controllers/CotizandoController');
const Validaciones = require('../modules/validaciones/Validaciones')

router.get("/", CotizandoController.index);

router.post("/",[
    body('rut')
    .custom((value, { req }) => {
        const RUTresult = Validaciones.validarRUT(value);
        if (RUTresult == 1) {
            throw new Error('Campo obligatorio');
        }else if (RUTresult == 2) {
            throw new Error('RUT Incompleto');
        }else if (RUTresult == 3) {
            throw new Error('RUT Inválido');
        }
        return true;
    }),
    body('nombres')
    .custom((value, { req }) => {
        if (value.length < 1) {
            throw new Error('Campo obligatorio');
        }
        return true;
    }),
    body('apellidos')
    .custom((value, { req }) => {
        if (value.length < 1) {
            throw new Error('Campo obligatorio');
        }
        return true;
    }),
    body('celular')
    .custom((value, { req }) => {
        if (value.length < 1) {
            throw new Error('Campo obligatorio');
        }else if(isNaN(value)){
            throw new Error('Ingrese un valor numérico');
        }
        return true;
    }),
    body('email')
    .custom((value, { req }) => {
        reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value.length < 1) {
            throw new Error('Campo obligatorio');
        }else if(reg.test(value)==false){
            throw new Error('Ingrese e-mail válido');
        }
        return true;
    }),
], CotizandoController.set);

module.exports = router;
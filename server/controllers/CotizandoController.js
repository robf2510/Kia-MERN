const { body, validationResult } = require('express-validator');
const path = require("path");

const CotizandoDB = require('../modules/database/CotizandoDB');
const CotizandoPDF = require('../modules/pdf/CotizandoPDF');

const CotizandoController = {};

CotizandoController.index = (req, res)=>{
    res.render("cotizando", {});
};

CotizandoController.set = async(req, res)=>{
    const errors = validationResult(req);
    const valores = req.body;
    const errores = errors.array();     

    if (!errors.isEmpty()) {
        res.render("cotizando", {valores:valores, errores:errores});
    }else{
        const {rut, nombres, apellidos, celular, email} = valores;
        const v_rut = await CotizandoDB.v_rut(rut);
        const v_email = await CotizandoDB.v_email(email);
        if(v_rut.length < 1 && v_email.length < 1){
            const result = await CotizandoDB.create(valores);
            CotizandoPDF.generarPDF(result);
            const nombre_pdf='CZ-'+rut+'.pdf';
            await CotizandoDB.update_pdf(result.id, nombre_pdf);
            res.send("Gracias");
        }else{     
            if(v_rut.length >= 1){
                errores.push({
                    msg: 'Este RUT ya existe',
                    param: 'rut'
                });
            }
            if(v_email.length >= 1){
                errores.push({
                    msg: 'Este Email ya existe',
                    param: 'email'
                });
            }
            res.render("cotizando", {valores:valores, errores:errores});
        }        
    }
};

module.exports = CotizandoController;
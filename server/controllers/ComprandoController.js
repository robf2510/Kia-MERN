const { body, validationResult } = require('express-validator');
const path = require("path");

const ComprandoDB = require('../modules/database/ComprandoDB');
const ComprandoPDF = require('../modules/pdf/ComprandoPDF');

const ComprandoController = {};

ComprandoController.index = (req, res)=>{
    res.render("comprando", {});
}

ComprandoController.set = async(req, res)=>{
    const errors = validationResult(req);
    const valores = req.body;
    const errores = errors.array();
   
    if (!errors.isEmpty()) {
      res.render("comprando", {valores:valores, errores:errores});
    }else{
        const {rut, nombres, apellidos, celular, email, concesionario, tipo_persona, saveSignature} = valores;
        const v_rut = await ComprandoDB.v_rut(rut);
        const v_email = await ComprandoDB.v_email(email);
        if(v_rut.length < 1 && v_email.length < 1){
            const result = await ComprandoDB.create(valores);
            ComprandoPDF.generarPDF(result, saveSignature);
            const nombre_pdf='CP-'+rut+'.pdf';
            await ComprandoDB.update_pdf(result._id, nombre_pdf);        
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
            res.render("comprando", {valores:valores, errores:errores});
        }   
    }
}

module.exports = ComprandoController;
const { body, validationResult } = require('express-validator');
const path = require("path");

const ReservandoDB = require('../modules/database/ReservandoDB');
const ReservandoPDF = require('../modules/pdf/ReservandoPDF');

const ReservandoController = {};

ReservandoController.index = (req, res)=>{
    res.render("reservando", {});
}

ReservandoController.set = async(req, res)=>{
    const errors = validationResult(req);
    const valores = req.body;
    const errores = errors.array();
    
    if (!errors.isEmpty()) {      
      res.render("reservando", {valores:valores, errores:errores});
    }else{
        const {rut, nombres, apellidos, celular, email, concesionario, banco, saveSignature} = valores;
        const v_rut = await ReservandoDB.v_rut(rut);
        const v_email = await ReservandoDB.v_email(email);
        if(v_rut.length < 1 && v_email.length < 1){
            const result = await ReservandoDB.create(valores);
            ReservandoPDF.generarPDF(result, saveSignature);
            const nombre_pdf='RV-'+rut+'.pdf';
            await ReservandoDB.update_pdf(result.id, nombre_pdf);
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
            res.render("reservando", {valores:valores, errores:errores});
        }        
    }
}

module.exports = ReservandoController;
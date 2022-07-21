const CotizandoModel = require('../../models/CotizandoModel')

async function create(valores){
    try{
        const {rut, nombres, apellidos, celular, email} = valores;
        const fecha = new Date().toLocaleDateString();
        const pdf = '';
        const query = new CotizandoModel({rut, nombres, apellidos, celular, email, pdf, fecha});
        const result = await query.save();
        return result;  
    }
    catch(e){
        console.error(e);
    }  
}

async function update_pdf(id,pdf){
    try{
        await CotizandoModel.updateOne({_id:id}, {pdf:pdf});
    }
    catch(e){
        console.error(e);
    } 
}

async function v_rut(rut){
    try{
        const result = await CotizandoModel.find({rut:rut});
        return result;  
    }
    catch(e){
        console.error(e);
    } 
}

async function v_email(email){
    try{
        const result = await CotizandoModel.find({email:email});
        return result;  
    }
    catch(e){
        console.error(e);
    } 
} 

module.exports = {create, update_pdf, v_rut, v_email};
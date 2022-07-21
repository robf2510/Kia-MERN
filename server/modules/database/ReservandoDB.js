const ReservandoModel = require('../../models/ReservandoModel')

async function create(valores){
    try{
        const {rut, nombres, apellidos, celular, email, concesionario, banco, saveSignature} = valores;
        const fecha = new Date().toLocaleDateString();
        const pdf = '';
        const firma = 1;        
        const query = new ReservandoModel({rut, nombres, apellidos, celular, email, concesionario, banco, pdf, fecha, firma});
        const result = await query.save();
        return result;  
    }
    catch(e){
        console.error(e);
    } 
}

async function update_pdf(id,pdf){
    try{
        await ReservandoModel.updateOne({_id:id}, {pdf:pdf});
    }
    catch(e){
        console.error(e);
    } 
}

async function v_rut(rut){
    try{
        const result = await ReservandoModel.find({rut:rut});
        return result;  
    }
    catch(e){
        console.error(e);
    } 
}

async function v_email(email){
    try{
        const result = await ReservandoModel.find({email:email});
        return result;  
    }
    catch(e){
        console.error(e);
    } 
} 

module.exports = {create, update_pdf, v_rut, v_email};
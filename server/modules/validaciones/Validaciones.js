
function validarRUT(value){

    var value1 = value;
        var valor = typeof value === 'string'? value.replace(/^0+|[^0-9kK]+/g, '').toUpperCase(): '';
        cuerpo = valor.slice(0, -1); 
        dv = valor.slice(-1).toUpperCase();
        var result = valor.slice(-4, -1) + '-' + valor.substr(valor.length - 1)
        for (var i = 4; i < valor.length; i += 3) {
            result = valor.slice(-3 - i, -i) + '.' + result
        }
        value = result;
        suma = 0;
        multiplo = 2;
        for (i = 1; i <= cuerpo.length; i++) {
            index = multiplo * valor.charAt(cuerpo.length - i);
            suma = suma + index;
            if (multiplo < 7) {
                multiplo = multiplo + 1;
            } else {
                multiplo = 2;
            }
        }
        dvEsperado = 11 - (suma % 11);
        dv = dv == "K" ? 10 : dv;
        dv = dv == 0 ? 11 : dv;
        if (value1.length < 1) {
            return 1;
        }else if (cuerpo.length < 7) {
            return 2;
        }else if (dvEsperado != dv) {
            return 3;
        }else{
            return 0;
        }

}

module.exports ={validarRUT};
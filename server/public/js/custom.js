jQuery(document).ready(function( $ ){    
    if ($("#checkbox").length && $("#checkbox2").length) {
        $('#checkbox').prop('checked', true);
        $('#checkbox2').prop('checked', true);
        if($('#checkbox').prop('checked') && $('#checkbox2').prop('checked')){
            $('#btn-form').prop('disabled', false);
        }else{
            $('#btn-form').prop('disabled', true);
        }
        $("#checkbox").change(function() {
            if($('#checkbox').prop('checked') && $('#checkbox2').prop('checked')){
                $('#btn-form').prop('disabled', false);
            }else{
                $('#btn-form').prop('disabled', true);
            }
        });
        $("#checkbox2").change(function() {
            if($('#checkbox').prop('checked') && $('#checkbox2').prop('checked')){
                $('#btn-form').prop('disabled', false);
            }else{
                $('#btn-form').prop('disabled', true);
            }
        });
    }
    if ($("#saveSignature").length) {
        $('#btn-form').prop('disabled', true);
    }
    if ( $("#rut").length) {
        rut.addEventListener('input', format, true);
        rut.addEventListener("keypress", soloNumeros, false);
    }
    if ($("#celular").length) {
        $('#celular').on('input', function () { 
            this.value = this.value.replace(/[^0-9]/g,'');
        });
    }

    function format () {    
        rut = clean($("#rut").val());      
        var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
        for (var i = 4; i < rut.length; i += 3) {
          result = rut.slice(-3 - i, -i) + '.' + result
        }
        $("#rut").val(result);
    }
    function clean (rut) {
        return typeof rut === 'string'
          ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
          : ''
    } 
    function soloNumeros(e){
        var charCode = e.which ? e.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode === 75) {
          e.preventDefault();
        }
    }
});
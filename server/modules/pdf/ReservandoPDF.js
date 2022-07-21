const PdfkitConstruct = require('pdfkit-construct');
const fs = require('fs');
const path = require("path");

const configuracion = {                    
    width: "fill_body",
    marginTop : 0,
    marginBottom : 5,
    marginLeft: 0,
    marginRight: 0,
    border: {size: 0.1, color: '#000000'},
    striped : false,
    stripedColors : ['#fff', '#f0ecd5'],
    headBackground : '#000000',
    headAlign : 'center',
    headColor : '#FFFFFF',
    headFont : "Helvetica-Bold",
    headFontSize : 10,
    headHeight : 10,
    cellsFont : "Helvetica",
    cellsFontSize : 10,
    cellsAlign : 'center',
    cellsColor : "#000",
    cellsPadding : 5,
}

function generarPDF(valores, saveSignature){

    const {rut, nombres, apellidos, celular, email, fecha, concesionario, banco} = valores;

    const doc = new PdfkitConstruct({
        size: 'A4',
        margins: {top: 20, left: 20, right: 20, bottom: 20},
        bufferPages: false,
    });    

    doc.pipe(fs.createWriteStream(path.join(process.cwd() + '/public/pdf/reservando/RV-' + rut + '.pdf')));

            // set the header to render in every page
            doc.setDocumentHeader({}, () => {
                doc.lineJoin('miter')
                    .rect(0, 0, doc.page.width, doc.header.options.heightNumber).fill("#FFFFFF");

                doc.fill("#000000")
                    .image(path.join(process.cwd() + '/public/images/logo2.png'), doc.header.x, doc.header.y, {
                    fit: [100, 250]})
                    .fontSize(20)
                    .text("Reservando Kia", doc.header.x, doc.header.y + 15, {align:'center'});
            });
            // set the footer to render in every page
            doc.setDocumentFooter({}, () => {
                doc.lineJoin('miter')
                    .rect(0, doc.footer.y, doc.page.width, doc.footer.options.heightNumber).fill("#FFFFFF");

                doc.fill("#000000")
                    .fontSize(8)
                    .text("", doc.footer.x, doc.footer.y + 10);
            });

            doc.addTable(
                [
                    {key: 'fecha', label: 'Fecha', align: 'center'},
                    {key: 'rut', label: 'RUT', align: 'center'}
                ],
                [{fecha:fecha, rut:rut}],
                configuracion
            );
            doc.addTable(
                [
                    {key: 'nombres', label: 'Nombres', align: 'center'},
                    {key: 'apellidos', label: 'Apellidos', align: 'center'}
                ],
                [{nombres:nombres, apellidos:apellidos}],
                configuracion
            );
            doc.addTable(
                [
                    {key: 'email', label: 'E-mail', align: 'center'},
                    {key: 'celular', label: 'Celular', align: 'center'}
                ],
                [{email:email, celular:celular}],
                configuracion
            );
            doc.addTable(
                [
                    {key: 'concesionario', label: 'Concesionario', align: 'center'},
                    {key: 'banco', label: 'Banco', align: 'center'}
                ],
                [{concesionario:concesionario, banco:banco}],
                configuracion
            );

            doc.image(saveSignature, 320, 350, {width: 250, height: 150})
                .text('Firma:', 320, 350);

            doc.render();
            doc.end();

}

module.exports = {generarPDF};
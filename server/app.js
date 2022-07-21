const express = require("express");
const path = require("path");

const {mongoose} = require('./database');

const app = express();
const { body, validationResult } = require('express-validator');

const IndexRoute = require('./routes/IndexRoute');
const CotizandoRoute = require('./routes/CotizandoRoute');
const ReservandoRoute = require('./routes/ReservandoRoute');
const ComprandoRoute = require('./routes/ComprandoRoute');

app.set('view engine','ejs');
app.set('views', path.join(__dirname + "/views"));

app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")));

app.use(express.urlencoded({extended:true}));

app.use('/', IndexRoute);

app.use('/cotizando', CotizandoRoute);

app.use('/reservando', ReservandoRoute);

app.use('/comprando', ComprandoRoute);

app.listen(4000, ()=>{
    console.log("server running on port:",4000);
});
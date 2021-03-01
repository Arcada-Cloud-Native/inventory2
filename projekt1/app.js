const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();


const invRoute = require('./inventory');

//Sätter upp förbindelsen till databasen
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://inventory2:inventory2@inventory2.enlmw.mongodb.net/Inventory2DB?retryWrites=true&w=majority');

//Alla inkommande request loggas på konsolen
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false }));

//Parsar automatiskt alla inkommande JSON-objekt.
app.use(bodyParser.json());

//Styr användarens request till rätt fil
app.use('/inventory', invRoute);

//Om en inkommande request inte är riktad mot rätt filer triggas denna metod
app.use((req, res, next) => {
    //Skapar ett nytt Error-objekt där vi ställer in "gällande fel"
    const error = new Error("Requested resource not found! Supported resources are ID's only");
    error.status = 404;
    //Skickar "erroret" vidare till nästa app.use
    next(error);
});

//Denna metod triggas av vilket som helst fel som uppstår under exekveringen. next(error) anropet på rad ish41 triggar även denna metod
app.use((error, req, res, next) => {
    //Vi skapar ett json-objekt där vi beskriver felet som uppstått. Vi ställer in status och error-message enligt det som finns i
    //error-objektet och skickar det till klienten
    res.status(error.status || 500).json({
        status: error.status,
        error: error.message
    });
});

module.exports = app;
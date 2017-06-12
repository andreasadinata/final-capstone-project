//packages needed
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const unirest = require('unirest');
const events = require('events');
//data store
const {
    DATABASE_URL, PORT
} = require('./config');
//schema or modelq
const {
    Plan
} = require('./models');
//use the express
const app = express();
//use of the app
//define usage of the app
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));
mongoose.Promise = global.Promise;


let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

//use emitter to get data from external API
function getData(originLocation, destinationLocation, departureDate, returnDate) {
    var emitter = new events.EventEmitter();
    //    dont forget change the sfo lax date etc
    unirest.get('http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/US/usd/en-US/SFOA/LAXA/2017-06-30/2017-07-04?apikey=prtl6749387986743898559646983194')
        .header("Accept", "application/json")
        .end(function (result) {
            if (result.ok) {
                emitter.emit('end', result.body);
            }
            //failure scenario
            else {
                emitter.emit('error', result.code);
            }
        });
    return emitter;
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
};

app.get('/flight/:originLocation/:destinationLocation/:departureDate/:returnDate', function (req, res) {
    //    external api function call and response
    var searchReq = getData(req.params.originLocation, req.params.destinationLocation, req.params.departureDate, req.params.returnDate);
    //get the data from the first api call
    searchReq.on('end', function (item) {
        res.json(item);
    });
    //error handling
    searchReq.on('error', function (code) {
        res.sendStatus(code);
    });

});



module.exports = {
    runServer, app, closeServer
};

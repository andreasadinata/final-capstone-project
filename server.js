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

//----------Plan from the database------------
//get plan from database
app.get('/plan', function (req, res) {
    Comment.find(function (err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(items);
    });
});
//post plan to database
app.post('/post-plan', function (req, res) {
    var requiredFields = ['title', 'originLocation', 'destinationLocation', 'departureDate', 'returnDate', 'flightPrice', 'roomType', 'roomPrice', 'foodFrequency', 'transportation', 'souvenirs', 'utilities', 'emergencyMoney'];
    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (!(field in req.body)) {
            var message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    Plan.create({
        title: req.body.title,
        originLocation: req.body.originLocation,
        destinationLocation: req.body.destinationLocation,
        departureDate: req.body.departureDate,
        returnDate: req.body.returnDate,
        flightPrice: req.body.flightPrice,
        roomType: req.body.roomType,
        roomPrice: req.body.roomPrice,
        foodFrequency: req.body.foodFrequency,
        foodPrice: req.body.foodPrice,
        transportation: req.body.transportation,
        souvenirs: req.body.foodPrice,
        utilities: req.body.foodPrice,
        emergencyMoney: req.body.foodPrice
    }, function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

//app.delete('/delete-comment/:id', function (req, res) {
//    Comment.findByIdAndRemove(req.params.id)
//        .exec()
//        .then(() => {
//        res.status(204).json({
//            message: 'success'
//        });
//    })
//        .catch(err => {
//        console.error(err);
//        res.status(500).json({
//            error: 'something went terribly wrong'
//        });
//    });
//});


module.exports = {
    runServer, app, closeServer
};

//db settings
const mongoose = require('mongoose');
const {
    TEST_DATABASE_URL
} = require('../config');
const {
    Plan
} = require('../models');

//chai settings
const chai = require('chai');
const chaiHTTP = require('chai-http');
const faker = require('faker');
const should = chai.should();
chai.use(chaiHTTP);

//server settings
const {
    app, runServer, closeServer
} = require('../server');


//start with faker to create a random data that we can use to test
function seedPlanData() {
    console.info('seeding the database');
    const seedData = [];
    for (let i = 1; i <= 10; i++) {
        seedData.push(generateData())
    }
    return Plan.insertMany(seedData);
}

function generateData() {
    data = {
        title: faker.lorem.words(),
        //        originLocation: faker.address.zipCode(),
        //        destinationLocation: faker.address.zipCode(),
        //        departureDate: faker.address.zipCode(),
        //        returnDate: faker.address.zipCode(),
        //        flightInbound: this.flightInbound,
        //        flightOutbound: this.flightOutbound,
        flightPrice: faker.random.number,
        //        roomType: this.roomType,
        roomPrice: faker.random.number,
        foodFrequency: faker.random.number,
        foodPrice: faker.random.number,
        transportation: faker.random.number,
        souvenirs: faker.random.number,
        utilities: faker.random.number,
        emergencyMoney: faker.random.number

    };
    return data;
}

//reset function
function tearDownDb() {
    console.warn('Deleting Database');
    return mongoose.connection.dropDatabase();
}


describe('active-test', function () {
    //instruction before everything start to make sure
    //before and after steps
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function () {
        return seedPlanData();
    });


    //main part of the test
    //start with get
    describe('test GET endpoint', function () {
        it('should list all the data', function () {
            return chai.request(app)
                .get('/active')
                .then(function (_res) {
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.length.of.at.least(1);
                    return Plan.count(); //
                })
                .then(count => {
                    res.body.should.have.length.of(count);
                });
        });
    });

    //continue with post
    describe('Test POST endpoint', function () {
        it('should add new Plan', function () {
            const newPost = generateData();
            chai.request(app)
                .post('/post-plan')
                .send(newPost)
                .then(function (res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys(
                        'id', 'title', 'originLocation', 'destinationLocation', 'departureDate', 'returnDate', 'flightInbound', 'flightOutbound', 'flightPrice',
                        'roomType', 'roomPrice', 'foodFrequency', 'foodPrice', 'transportation',
                        'souvenirs', 'utilities', 'emergencyMoney');
                    res.body.title.should.equal(newPost.title);
                    // cause Mongo should have created id on insertion
                    res.body.id.should.not.be.null;
                    res.body.originLocation.should.equal(newPost.originLocation);
                    res.body.destinationLocation.should.equal(newPost.destinationLocation);
                    res.body.departureDate.should.equal(newPost.departureDate);
                    res.body.returnDate.should.equal(newPost.returnDate);
                    res.body.flightInbound.should.equal(newPost.flightInbound);
                    res.body.flightOutbound.should.equal(newPost.flightOutbound);
                    res.body.flightPrice.should.equal(newPost.flightPrice);
                    res.body.roomType.should.equal(newPost.roomType);
                    res.body.roomPrice.should.equal(newPost.roomPrice);
                    res.body.foodFrequency.should.equal(newPost.foodFrequency);
                    res.body.foodPrice.should.equal(newPost.foodPrice);
                    res.body.transportation.should.equal(newPost.transportation);
                    res.body.souvenirs.should.equal(newPost.souvenirs);
                    res.body.utilities.should.equal(newPost.utilities);
                    res.body.emergencyMoney.should.equal(newPost.emergencyMoney);

                    return Plan.findById(res.body.id).exec();
                })
                .then(function (post) {
                    post.title.should.equal(newPost.title);
                    post.originLocation.should.equal(newPost.originLocation);
                    post.destinationLocation.should.equal(newPost.destinationLocation);
                    post.departureDate.should.equal(newPost.departureDate);
                    post.returnDate.should.equal(newPost.returnDate);
                    post.flightInbound.should.equal(newPost.flightInbound);
                    post.flightOutbound.should.equal(newPost.flightOutbound);
                    post.flightPrice.should.equal(newPost.flightPrice);
                    post.roomType.should.equal(newPost.roomType);
                    post.roomPrice.should.equal(newPost.roomPrice);
                    post.foodFrequency.should.equal(newPost.foodFrequency);
                    post.foodPrice.should.equal(newPost.foodPrice);
                    post.transportation.should.equal(newPost.transportation);
                    post.souvenirs.should.equal(newPost.souvenirs);
                    post.utilities.should.equal(newPost.utilities);
                    post.emergencyMoney.should.equal(newPost.emergencyMoney);
                });
        });
    });


    describe('Check Delete endpoint', function () {
        it('should delete a post based on the id', function () {
            let post;
            return Plan.findOne().exec()
                .then(_post => {
                    post = _post;
                    return chai.request(app).delete(`/delete-plan/${post.id}`);
                })
                .then(res => {
                    res.should.have.status(204);
                    return Plan.findById(post.id);
                });
        });
    });

    afterEach(function () {
        return tearDownDb();
    });
    after(function () {
        return closeServer();
    });
});

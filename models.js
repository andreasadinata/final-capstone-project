const mongoose = require('mongoose');

const PlanSchema = mongoose.Schema({
    title: {
        type: String
    },
    originLocation: {
        type: String
    },
    destinationLocation: {
        type: String
    },
    departureDate: {
        type: String
    },
    returnDate: {
        type: String
    },
    flightInbound: {
        type: String
    },
    flightOutbound: {
        type: String
    },
    flightPrice: {
        type: Number
    },
    roomType: {
        type: String
    },
    roomPrice: {
        type: Number
    },
    foodFrequency: {
        type: Number
    },
    foodPrice: {
        type: Number
    },
    souvenirs: {
        type: Number
    },
    utilities: {
        type: Number
    },
    emergencyMoney: {
        type: Number
    },
    transportation: {
        type: Number
    }
}, {
    versionKey: false
}, {
    collection: 'comment'
});

const Plan = mongoose.model('Plan', PlanSchema);

PlanSchema.methods.apiRepr = function () {
    return {
        id: this._id,
        title: this.title,
        originLocation: this.originLocation,
        destinationLocation: this.destinationLocation,
        departureDate: this.departureDate,
        returnDate: this.returnDate,
        flightInbound: this.flightInbound,
        flightOutbound: this.flightOutbound,
        flightPrice: this.flightPrice,
        roomType: this.roomType,
        roomPrice: this.roomPrice,
        foodFrequency: this.foodFrequency,
        foodPrice: this.foodPrice,
        transportation: this.transportation,
        souvenirs: this.souvenirs,
        utilities: this.utilities,
        emergencyMoney: this.emergencyMoney,
    };
}

module.exports = {
    Plan
};

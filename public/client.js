//state for temporary data
var state = {};

//render external flight api call
function displayFlightResults(externalData) {
    var currentQuotesObject = -1;
    var buildHtmlOutput = "";
    for (var i = 0; i < externalData.Quotes.length; i++) {
        if ((externalData.Quotes[i].InboundLeg !== undefined) && (externalData.Quotes[i].OutboundLeg !== undefined)) {
            var carrierInbound = findCarrier(externalData, externalData.Quotes[i].InboundLeg.CarrierIds[0])
            var carrierOutbound = findCarrier(externalData, externalData.Quotes[i].OutboundLeg.CarrierIds[0])
            currentQuotesObject = i;
        }
    }
    if (currentQuotesObject == -1) {
        buildHtmlOutput += '<div> I am Sorry we couldnt find any flight during that time</div>';
        console.log(currentQuotesObject);
    } else {
        console.log(currentQuotesObject);

        buildHtmlOutput += '<th> $' + externalData.Quotes[currentQuotesObject].MinPrice + '</th>';
        buildHtmlOutput += '<th>' + carrierInbound + '</th>';
        buildHtmlOutput += '<th>SFO</th>';
        buildHtmlOutput += '<th>' + carrierOutbound + '</th>';
        buildHtmlOutput += '<th>LAX</th>';
        buildHtmlOutput += '<th><button type="button">Add!</button></th>';
        state["flightPrice"] = externalData.Quotes[currentQuotesObject].MinPrice;
        state["flightInbound"] = carrierInbound;
        state["flightOutbound"] = carrierOutbound;
        console.log(state);
    }
    $(".js-find-flight-result").html(buildHtmlOutput);
}
//render correct widget
function renderHotelWidget(cityDestinationArray, departureDate, returnDate) {
    var buildWidget = "";
    buildWidget += '<iframe id="stay22-widget" width="100%" height="360" src ="https://www.stay22.com/embed/gm?lat=' + cityDestinationArray[1] + '&lng=' + cityDestinationArray[2] + '&title=' + cityDestinationArray[0] + '&checkin=' + departureDate + '&checkout=' + returnDate + ' " frameborder="0"></iframe>'
    $(".hotel-widget").html(buildWidget);
}
//find flight carrier based on ID
function findCarrier(data, ID) {
    var i = 0;
    while (i < data.Carriers.length) {
        if (data.Carriers[i].CarrierId = ID) {
            return data.Carriers[i].Name
        }
    }
}
//call external api into client.js
function callApi(inputData) {
    $.ajax({
            type: "GET",
            dataType: "json",
            url: "/flight/originLocation/destinationLocation/departureDate/returnDate"
        })
        .done(function (result) {
            console.log(result)
            displayFlightResults(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}
//post api call to server and database
function postPlanToDatabase(state) {
    $.ajax({
            type: "POST",
            dataType: "json",
            data: JSON.stringify(state),
            contentType: 'application/json',
            url: '/post-plan'
        })
        .done(function (result) {
            console.info("");
            console.log("inside post Comment");
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};

$(document).ready(function () {
    $('.js-result').hide();
    $('.find-deal').submit(function (event) {
        console.log("start");
        event.preventDefault();
        state = {};
        console.log(state);
        var cityOrigin = $('.city-origin-select').val();
        var cityOriginArray = cityOrigin.split("_");
        var cityDestination = $('.city-destination-select').val();
        var cityDestinationArray = cityDestination.split("_");
        state["originLocation"] = cityOriginArray[0];
        state["destinationLocation"] = cityDestinationArray[0];
        state["departureDate"] = $('.departureDate').val();
        state["returnDate"] = $('.returnDate').val();
        console.log(state);
        $('.js-result').show();
        callApi("hello");
        renderHotelWidget(cityDestinationArray, $('.departureDate').val(), $('.returnDate').val());

        $('.accomodation-input').submit(function (event) {
            event.preventDefault();
            state["roomType"] = $("input[class='accomodation-type']:checked").val();
            state["roomPrice"] = $('.acommodation-value').val();
            console.log(state);
        });
        $('.food-information').submit(function (event) {
            event.preventDefault();
            state["foodFrequency"] = $('#food-frequency').val();
            state["foodPrice"] = $('#food-per-day').val();
            console.log(state);
        });
        //        insert selection value
        //        for now use constant value
        $('.other-spend').submit(function (event) {
            event.preventDefault();
            state["souvenirs"] = $('#souvenirs').val();
            state["utilities"] = $('#utilities').val();
            state["emergencyMoney"] = $('#emergency-money').val();
            state["transportation"] = $('#transportation').val();
            console.log(state);
        });
        $('.summary-submit').submit(function (event) {
            event.preventDefault();
            state["title"] = $('#title').val();
            postPlanToDatabase(state);
        })
    });
});

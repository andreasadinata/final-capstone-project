//state for temporary data
var state = {};



//find the difference in date
function diffDate(departureDate, returnDate) {
    var departureDateUnix = new Date(departureDate).getTime() / 1000;
    var returnDateUnix = new Date(returnDate).getTime() / 1000;
    var output = parseInt((returnDateUnix - departureDateUnix) / 86400);
    return output;
}

//render summary
function displaySummarySubmit() {
    console.log(state);
    var buildHtmlOutput = "";
    var departureDateYMD = dateConverter(state["departureDate"]);
    var returnDateYMD = dateConverter(state["returnDate"]);
    var nights = diffDate(departureDateYMD, returnDateYMD);
    var days = (nights + 1);
    var otherMoney = +state["emergencyMoney"] + +(state["souvenirs"]) + +(state["transportation"]) + +(state["utilities"]);
    var foodMoney = ((state["foodPrice"]) * (state["foodFrequency"]));
    var totalMoney = (state["flightPrice"]) + (nights * (state["roomPrice"])) + otherMoney + (days * foodMoney);
    buildHtmlOutput += '<div class="js-plan-boxes-summary">';
    buildHtmlOutput += '<form class="wrapper-background-plan-boxes-summary">'
    buildHtmlOutput += '<h1>Review and share this plan with the others.</h1>'
    buildHtmlOutput += '<input type="text" id="title" required placeholder="input title">'
    buildHtmlOutput += '<h2>Total Price:</h2>';
    buildHtmlOutput += '<div class="plan-box-total-money">$ ' + totalMoney + ' </div>';
    buildHtmlOutput += '<div class="js-flight-plan-boxes">';
    buildHtmlOutput += '<div class="location-left">' + state["originLocation"] + '</div>';
    buildHtmlOutput += '<i class="fa fa-arrows-h top-arrow" aria-hidden="true"></i>';
    buildHtmlOutput += '<div class="location-right">' + state["destinationLocation"] + '</div>';
    buildHtmlOutput += '</div>';
    buildHtmlOutput += '<div class="js-date-plan-boxes">';
    buildHtmlOutput += '<span class="date-js-plan">' + state["departureDate"] + '</span>';
    buildHtmlOutput += '<i class="fa fa-arrows-h" aria-hidden="true"></i>'
    buildHtmlOutput += '<span class="date-js-plan">' + state["returnDate"] + '</span>';

    buildHtmlOutput += '<button class="initiate-post">Share</button>'
    buildHtmlOutput += '</form>';
    buildHtmlOutput += '</div>';
    $(".js-summary").html(buildHtmlOutput);
}

//render plan from database
function displayPlanDatabase(data) {
    var buildHtmlOutput = "";

    var maxLimitForLoop = 3;
    if (data.length < 3) {
        maxLimitForLoop = data.length;
    }

    for (i = 0; i < maxLimitForLoop; i++) {
        var backLoop = (data.length - 1) - i;
        var departureDateYMD = dateConverter(data[backLoop].departureDate);
        var returnDateYMD = dateConverter(data[backLoop].returnDate);
        var nights = diffDate(departureDateYMD, returnDateYMD);
        var days = (nights + 1);
        var otherMoney = data[backLoop].emergencyMoney + data[backLoop].souvenirs + data[backLoop].transportation + data[backLoop].utilities;
        var foodMoney = (data[backLoop].foodPrice * data[backLoop].foodFrequency);
        var totalMoney = data[backLoop].flightPrice + nights * (data[backLoop].roomPrice) + otherMoney + days * foodMoney;
        buildHtmlOutput += '<div class="js-plan-boxes-' + i + '">';
        buildHtmlOutput += '<div class="wrapper-background-plan-boxes">'
        buildHtmlOutput += '<input class="hiddenId" type="hidden" value="' + data[backLoop]._id + '">';
        buildHtmlOutput += '<div class="plan-box-title">' + data[backLoop].title + '</div>';
        buildHtmlOutput += '<div class="plan-box-total-money">$ ' + totalMoney + '</div>';
        buildHtmlOutput += '<div class="js-flight-plan-boxes">';
        buildHtmlOutput += '<div class="location-left">' + data[backLoop].originLocation + '</div>';
        buildHtmlOutput += '<i class="fa fa-arrows-h top-arrow" aria-hidden="true"></i>'
        buildHtmlOutput += '<div class="location-right">' + data[backLoop].destinationLocation + '</div>';
        buildHtmlOutput += '</div>';
        buildHtmlOutput += '<div class="js-date-plan-boxes">';
        buildHtmlOutput += '<span class="date-js-plan">' + data[backLoop].departureDate + '</span>';
        buildHtmlOutput += '<i class="fa fa-arrows-h" aria-hidden="true"></i>';
        buildHtmlOutput += '<span class="date-js-plan">' + data[backLoop].returnDate + '</span>';
        buildHtmlOutput += '</div>';
        buildHtmlOutput += '<div class="js-breakdown-plan-boxes">';
        buildHtmlOutput += '<div>Breakdown</div>';
        buildHtmlOutput += '<div><div class="box-left">' + data[backLoop].roomType + '</div><div class="box-middle">:</div><div class="box-right"> $' + (nights * (data[backLoop].roomPrice)) + '</div></div>';
        buildHtmlOutput += '<div><div class="box-left">Flight</div><div class="box-middle">:</div><div class="box-right"> $' + data[backLoop].flightPrice + '</div></div>';
        buildHtmlOutput += '<div><div class="box-left">Food</div><div class="box-middle">:</div><div class="box-right"> $' + (days * foodMoney) + '</div></div>';
        buildHtmlOutput += '<div><div class="box-left">Other</div><div class="box-middle">:</div><div class="box-right"> $' + otherMoney + '</div></div>';
        buildHtmlOutput += '</div>';
        buildHtmlOutput += '<button class="js-delete-box">Delete</button>';
        buildHtmlOutput += '</div>';
        buildHtmlOutput += '</div>';

    };
    $(".js-plan").html(buildHtmlOutput);

}
//render external flight api call
function displayFlightResults(originLocation, destinationLocation, externalData) {
    console.log(externalData);
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
        $('.js-table-flight').hide();
        $('.js-flight-not-found').show();
        $('.js-flight').hide();
        $('#accomodation-and-foods').hide();
        $('.continue').hide();

    } else {
        $('.js-flight').show();
        $('.js-flight-not-found').hide();
        $('.js-table-flight').show();
        $('#accomodation-and-foods').show();
        $('.continue').show();
        buildHtmlOutput += '<li class="flight-format padding"> $' + externalData.Quotes[currentQuotesObject].MinPrice + '</li>';
        buildHtmlOutput += '<li class="flight-format padding">' + carrierInbound + '</li>';
        buildHtmlOutput += '<li class="flight-format padding">' + originLocation + '</li>';
        buildHtmlOutput += '<li class="flight-format padding">' + carrierOutbound + '</li>';
        buildHtmlOutput += '<li class="flight-format padding">' + destinationLocation + '</li>';
        state["flightPrice"] = externalData.Quotes[currentQuotesObject].MinPrice;
        state["flightInbound"] = carrierInbound;
        state["flightOutbound"] = carrierOutbound;

    }
    $(".js-find-flight-result").html(buildHtmlOutput);
}
//render correct widget
function renderHotelWidget(cityDestinationArray, departureDate, returnDate) {
    var buildWidget = "";
    buildWidget += '<iframe id="stay22-widget" width="80%" height="360" src ="https://www.stay22.com/embed/gm?lat=' + cityDestinationArray[1] + '&lng=' + cityDestinationArray[2] + '&title=' + cityDestinationArray[0] + '&checkin=' + departureDate + '&checkout=' + returnDate + ' " frameborder="0"></iframe>'
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
//date converter from MMDDYYYY to YYYY-MM-DD
function dateConverter(date) {
    var dateContainerArray = date.split("/");
    var dateOutput = dateContainerArray[2] + "-" + dateContainerArray[0] + "-" + dateContainerArray[1];

    return dateOutput;
}

//call external api into client.js
function callApi(originLocation, destinationLocation, departureDate, returnDate) {
    var formattedDepartureDate = dateConverter(departureDate);
    var formattedReturnDate = dateConverter(returnDate);
    $.ajax({
            type: "GET",
            dataType: "json",
            url: "/flight/" + originLocation + "/" + destinationLocation + "/" + formattedDepartureDate + "/" + formattedReturnDate
        })
        .done(function (result) {

            displayFlightResults(originLocation, destinationLocation, result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            $('.js-table-flight').hide();
            $('.js-flight-not-found').show();
            $('#accomodation-and-foods').hide();
            $('.continue').hide();
            $('.js-flight').hide();
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}
//post api call to server and database
function postPlanToDatabase(state) {
    console.log(state);
    $.ajax({
            type: "POST",
            dataType: "json",
            data: JSON.stringify(state),
            contentType: 'application/json',
            url: '/post-plan'
        })
        .done(function (result) {
            $('.thank-you').show();
            $('.js-flight-not-found').hide();
            $('.js-summary').hide();
            $('.js-result').hide();
            displayPlan();
            $('#title').val('');
            $('#transportation').val('');
            $('#emergency-money').val('');
            $('#utilities').val('');
            $("input[class='accomodation-type']:checked").val('');
            $('.acommodation-value').val('');
            $('#food-frequency').val('');
            $('#food-per-day').val('');
            $('#souvenirs').val('');

        })
        .fail(function (jqXHR, error, errorThrown) {
            alert('Input all the values')
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};

//API call from database
function displayPlan() {
    $.ajax({
            type: "GET",
            dataType: "json",
            url: '/plan/'
        })
        .done(function (result) {
            displayPlanDatabase(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};
//ajax delete database based on ID
function deleteData(DeleteId) {
    $.ajax({
            type: "DELETE",
            dataType: "json",
            contentType: 'application/json',
            url: '/delete-plan/' + DeleteId
        })
        .done(function (result) {
            displayPlan();

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//jquery function delete plan
$('.js-plan').on('click', '.js-delete-box', function (event) {
    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();
    console.log("inside the deleteBox trigger");
    var IdToBeDeleted = $(this).parent().find('.hiddenId').val();
    console.log(IdToBeDeleted);
    deleteData(IdToBeDeleted);

});


$(document).ready(function () {
    //reset the starting location
    //hide the result before user's input
    $('.js-flight-not-found').hide();
    $('.js-summary').hide();
    $('.thank-you').hide();
    $('.js-result').hide();
    $('.logo-2').hide();
    //get plan section from database
    displayPlan();

    $('.find-deal').submit(function (event) {
        event.preventDefault();
        state = {};
        $('.thank-you').hide();
        var cityOrigin = $('.city-origin-select').val();
        var cityOriginArray = cityOrigin.split("_");
        var cityDestination = $('.city-destination-select').val();
        var cityDestinationArray = cityDestination.split("_");
        state["originLocation"] = cityOriginArray[0];
        state["destinationLocation"] = cityDestinationArray[0];
        state["departureDate"] = $('.departureDate').val();
        state["returnDate"] = $('.returnDate').val();
        departureDateArray = state["departureDate"].split("/");
        returnDateArray = state["returnDate"].split("/");
        var departureDateYMD = dateConverter(state["departureDate"]);
        var returnDateYMD = dateConverter(state["returnDate"]);
        var nights = diffDate(departureDateYMD, returnDateYMD);
        console.log(nights);
        if (cityOrigin == cityDestination) {
            alert('Origin and destination locations should not be the same');
        } else if (nights == 0) {
            alert('Day trip is not fun at all');
        } else if ((departureDateArray[0] > 12) || (returnDateArray[0] > 12) || (returnDateArray[1] > 31) || (departureDateArray[0] > 31)) {
            alert('Insert the correct dates');
        } else if (nights < 0) {
            alert('Insert the correct dates');

        } else {
            $('.js-result').show();
            callApi(cityOriginArray[3], cityDestinationArray[3], state["departureDate"], state["returnDate"]);
            renderHotelWidget(cityDestinationArray, $('.departureDate').val(), $('.returnDate').val());
            $('#accomodation-and-foods').submit(function (event) {
                event.preventDefault();
                $('.js-summary').show();
                state["roomType"] = $("input[class='accomodation-type']:checked").val();
                state["roomPrice"] = $('.acommodation-value').val();
                state["foodFrequency"] = $('#food-frequency').val();
                state["foodPrice"] = $('#food-per-day').val();
                state["souvenirs"] = $('#souvenirs').val();
                state["utilities"] = $('#utilities').val();
                state["emergencyMoney"] = $('#emergency-money').val();
                state["transportation"] = $('#transportation').val();
                displaySummarySubmit()
                $('.wrapper-background-plan-boxes-summary').submit(function (event) {
                    event.preventDefault();
                    state["title"] = $('#title').val();
                    postPlanToDatabase(state);
                });

            });

        }
    });
});

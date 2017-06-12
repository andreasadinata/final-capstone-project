function displaySearchResult(externalData) {

}


function callApi(inputData) {
    $.ajax({
            type: "GET",
            dataType: "json",
            url: "/flight/" + inputData
        })
        .done(function (result) {
            console.log(result)
                //        displaySearchResults(result);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

$(document).ready(function () {

    $('.js-result').hide();
    $('.find-deal').submit(function (event) {
        event.preventDefault();
        $('.js-result').show();
        //        insert selection value
        //        for now use constant value

    });
});

$(document).ready(function () {

    var topics = [
        "cats",
        "dog",
        "birds",
        "lizards",
        "bears",
        "ducks",
        "goats",
        "gorillas",
        "wolves",
        "lemurs",

    ];
    var API_KEY = "3KLuEhFmwhFxyHRLkBiFF7R8ATYQb8Bn";
    var requestUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=10&q=";
    console.log(requestUrl)

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-info");
        button.text(topics[i]);


        $("#buttons").append(button);
    }

    $("#buttons").on("click", ".btn", function () {
        console.log($(this).text())
        $.ajax({
            method: "GET",
            url: requestUrl + $(this).text()

        }).then(function (response) {
            console.log(response.data[0].rating)

            $("#gifs").empty()

            for (var i = 0; i < response.data.length; i++) {
                var rating = response.data[i].rating
                var pTag = $("<p>")
                pTag.text("rating: " + rating)
                var stillImg = response.data[i].images.downsized_still.url;
                var movingImg = response.data[i].images.downsized.url;
                var image = $("<img>")
                image.attr("src", stillImg)
                image.attr("data-still", stillImg)
                image.attr("data-animated", movingImg)
                image.attr("data-state", "still")
                image.addClass("card-img-top")
                var div = $("<div>")
                div.append(image)
                div.append(pTag)
                div.addClass("card")
                $("#gifs").append(div)


            }
        })

    }); // button on click
    $("#gifs").on("click", "img", function () {

        var movingImg = $(this).attr("data-animated")
        var stillImg = $(this).attr("data-still")
        var state = $(this).attr("data-state")
        if (state === "still") {
            $(this).attr("src", movingImg)
            $(this).attr("data-state", "animated")
        } else {
            $(this).attr("src", stillImg)
            $(this).attr("data-state", "still")
        }

    })
    $("form").on("submit", function (event) {
        event.preventDefault()
        var input = $("#input").val()
        console.log($("#input").val())
        var button = $("<button>");
        button.addClass("btn btn-info");
        button.text(input);


        $("#buttons").append(button);
    })
});



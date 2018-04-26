$(document).ready(function () {

    var topics = [
        "cats",
        "dogs",
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
        button.text(topics[i])
        button.on("click", function () {
            $.ajax({
                method: "GET",
                url: requestUrl + $(this).text()
            }).then(function (response) {
                $("#gifs").empty()
                // console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    var img = $("<img>");
                    img.attr("src", response.data[i].images.downsized_still.url);
                    img.attr("data-animated", response.data[i].images.downsized.url);
                    img.attr("data-still", response.data[i].images.downsized_still.url);
                    img.attr("data-state", "animated");
                    // img.attr("src", response.data[i].images.rating.url);
                    // attach the element to the body
                    // $("body").append(img);
                    console.log(img)
                    console.log(this)

                    img.on("click", function () {

                        var state = $(this).attr("data-state");
                        if (state === "animated") {
                            $(this).attr("data-state", "still");
                            $(this).attr("src", $(this).attr("data-animated"));
                            
                        }
                        else {
                            $(this).attr("data-state", "animated");
                            $(this).attr("src", $(this).attr("data-still"));
                            
                        }
                    });

                    
                    $("#gifs").append(img);
                }
            })

        })
        $("#buttons").append(button)
    }
})


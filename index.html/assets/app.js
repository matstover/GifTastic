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
        console.log(topics[i])
        
        $("#buttons").append(button);
    }

     $(".btn").on("click", function() {
         console.log($(this).text())
         $.ajax({
             method: "GET",
             url: requestUrl + $(this).text()
            
         }).then(function(response){
             console.log(response.data[0].rating)

            $("#gifs").empty()

             for (var i = 0; i < response.data.length; i++){
                var rating = response.data[i].rating
                var pTag = $("<p>")
                pTag.text("rating: "+rating)
                 var stillImg = response.data[i].images.downsized_still.url;
                 var movingImg = response.data[i].images.downsized.url;
                 var image = $("<img>")
                 image.attr("src", stillImg)
                 image.attr("data-still", stillImg)
                 image.attr("data-animated", movingImg)
                 image.attr("data-state", "still")
                 image.addClass("card-img-top")
                 var div=$("<div>")
                div.append(image)
                 div.append(pTag) 
                 div.addClass("card")
                 $("#gifs").append(div)


             }
         })
         
     }); // button on click
 $("#gifs").on("click", "img" ,function (){
     
     var movingImg = $(this).attr("data-animated")
     var stillImg= $(this).attr("data-still")
     var state= $(this).attr("data-state")
     if (state === "still" ){
         $(this).attr("src", movingImg)
         $(this).attr("data-state", "animated")
     }else {
         $(this).attr("src", stillImg)
         $(this).attr("data-state", "still")
     }
     
 })

});

// ;
// $("#buttons").append(buttons); {
// }
// function createImage(response, i) {
//     var img = $("<img>");
//     img.attr("data-rating", response.data[i].rating);
//     console.log(response.data[i].rating)
//     img.attr("src", response.data[i].images.downsized_still.url);
//     img.attr("data-animated", response.data[i].images.downsized.url);
//     img.attr("data-still", response.data[i].images.downsized_still.url);
//     img.attr("data-state", "animated");
    
//     var gifCard = $("<div class = 'gif-card'>")
//     var pRating = $("<p>")
    
    
//     gifCard.append(img);
//     pRating.append("Rating: " + response.data[i].rating);
//     gifCard.append(pRating)
//     return gifCard
    
    
// }
// $("button").on("click", function () {
//     $.ajax({
//         method: "GET",
//         url: requestUrl + $(this).text()
//     }).then(function (response) {
//         $("#gifs").empty()
//         console.log(response.data);
//         for (var i = 0; i < response.data.length; i++) {
//             var img = createImage(response, i);
//             // img.attr("data-rating", response.data[i].images.rating.url);
//             // attach the element to the body
//             // $("body").append(img);
//             $("button").on("click", function () {
                
//             })
            
//             // get the gifs to show up in the DOM
//             // tried .innerHTML, document.getElementById, & (and in a desperate attempt to
//             // get something to work).text
//             // document.getElementById("#button").innerHTML = ;
//         };
//         $("img").on("click", function () {
//             var state = $(this).attr("data-state");
//             if (state === "animated") {
//                 $(this).attr("src", $(this).attr("data-animated"));
//                 $(this).attr("data-state", "still");
                
//             }
//             else {
//                 $(this).attr("src", $(this).attr("data-still"));
//                 $(this).attr("data-state", "animated");
                
//             }
//         })
//     });
// });

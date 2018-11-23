// // // create an array of strings based on a topic of choice (var topics)

var topics = [
    "creative coding",
    // "perfect loop",
    "opart",
    "vaporwave",
    "colors",
    "pi slices",
    "abstract",
    "trippy",
    "polygonal rotation"
]

///// MAKE BUTTONS ////////////////////

function makeBtns() {
    $("#buttons").empty();

    // Looping through the array
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array
        var a = $("<button>");
        // Adding a class to our button
        a.addClass("gifBtn");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons div
        $("#buttons").append(a);
    }
}

///// PULL GIF DATA ////////////////////

function showGifs() {

    $("#gifSection").empty();

    var apiKey = "h51PzGApg6VvLZRHlprU2fQoB2C7qfk7";

    var gifTerm = $(this).attr("data-name");

    // giphy query url: make sure https
    var queryUrl = ("https://api.giphy.com/v1/gifs/search?q=" + gifTerm + "&api_key=" + apiKey + "&limit=10");

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        // store the results
        var results = response.data;
        // loop through each item in the results

        for (var i = 0; i < results.length; i++) {

            console.log("DATA: ", response);

            // Creating a div to hold the gif
            var gifsDiv = $("<div class='gifs'>");

            // // Retrieving the URL for the image
            // var imgUrl = results[i].images.fixed_width_still.url;
            // // Creating an element to hold the image
            // var image = $("<img>").attr("src", imgUrl);

                        // Retrieving the URL for the image
                        var imgUrl = results[i].images;
                        // Creating an element to hold the image
                        var image = $("<img>").attr({
                            src: imgUrl.fixed_width_still.url,
                            "data-still": imgUrl.fixed_width_still.url,
                            "data-animate": imgUrl.fixed_width.url,
                            "data-state": "still"
                        });

            // Appending the image
            gifsDiv.append(image);

            // Putting the gifs on the page;
            $("#gifSection").append(gifsDiv);

            // Storing the rating data
            var rating = results[i].rating;

            // Creating an element to have the rating displayed
            var showRating = $("<p class='rating'>").text("Rating: " + rating);
            // Displaying the rating
            gifsDiv.append(showRating);
        }

    });

}

///// EVENT LISTENERS FOR BUTTON CLICK ////
$("#buttons").on("click", ".gifBtn", showGifs);

$(".gifs").on("click", function() {
    var state = $(this).attr("data-state");
    
})

// // When the user clicks one of the still GIPHY images,
// // the gif should animate
// // If the user clicks the gif again
// // it should stop playing.


///// CALLING FUNCTIONS //////////////////

makeBtns();

//////////////////////////////////////////////////////////////////////////////////////////////

// giphy api: q, limit, rating



// //Add a form to your page
// // takes the value from a user input box
// // and adds it into your `topics` array

// //Then make a function call that takes each topic in the array
// //remakes the buttons on the page.

//////////////////////////////////////////////////////////////////////////////////////////////

// ### Bonus Goals

// 1. Ensure your app is fully mobile responsive.

// 2. Allow users to request additional gifs to be added to the page.
//    * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

// 3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

// 4. Include a 1-click download button for each gif, this should work across device types.

// 5. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio

// 6. Allow users to add their favorite gifs to a `favorites` section.
//    * This should persist even when they select or add a new topic.
//    * If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies).

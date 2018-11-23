// // // create an array of strings based on a topic of choice (var topics)

var topics = [
    "creative coding",
    "perfect loop",
    "opart",
    "reflection",
    "colors",
    "pi slices",
    "abstract",
    "dripping",
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

function pullGifs() {
    
    var apiKey = "h51PzGApg6VvLZRHlprU2fQoB2C7qfk7";

    var gifTerm = $(this).attr("data-name");

    var queryUrl = $.get("http://api.giphy.com/v1/gifs/search?q=" + gifTerm + "&api_key=" + apiKey + "&limit=10");

    queryUrl.done(function (data) {
        console.log("success got data", data);
    });
};


///// EVENT LISTENER FOR BUTTON CLICK ////


///// CALLING FUNCTIONS //////////////////

makeBtns();

pullGifs();

//////////////////////////////////////////////////////////////////////////////////////////////

// // // giphy api: q, limit, rating
// // // giphy query url: make sure https

// // When the user clicks on a button
// // the page should grab 10 static, non-animated gif images from the GIPHY API
// // and place them on the page.

// // When the user clicks one of the still GIPHY images,
// // the gif should animate
// // If the user clicks the gif again
// // it should stop playing.

// // Under every gif, display its rating (PG, G, so on).

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

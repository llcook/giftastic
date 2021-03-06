$(document).ready(function () {

    ///// ARRAY /////////////////////////////

    var topics = [
        "creative coding",
        // "perfect loop",
        "opart",
        "vaporwave",
        "colors",
        // "pi slices",
        "trippy",
        "abstract",
        "geometry",
        "psychedelic",
        "polygonal rotation",
    ]

    var favorites = [];

    ///// MAKE BUTTONS ////////////////////

    function makeBtns() {

        $("#gifInput").val("");

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

    ///// PULL GIFS ///////////////////////

    function showGifs() {

        $("#gifSection").empty();

        var apiKey = "h51PzGApg6VvLZRHlprU2fQoB2C7qfk7";

        var gifTerm = $(this).attr("data-name");

        // giphy query url: make sure https
        var queryUrl = ("https://api.giphy.com/v1/gifs/search?q=" + gifTerm + "&api_key=" + apiKey + "&limit=9");

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {

            // store results
            var results = response.data;
            console.log(results);

            // loop through each item in results
            for (var i = 0; i < results.length; i++) {

                // create div to hold gif
                var gifsDiv = $("<div class='gifContainer clearfix'>");

                // SHOW IMAGES

                // retrieve image url
                var imgUrl = results[i].images;

                // create image element
                // and attributes/data for animate/still images
                var image = $("<img>").addClass("gif").attr({
                    src: imgUrl.original_still.url,
                    "data-still": imgUrl.original_still.url,
                    "data-animate": imgUrl.original.url,
                    "data-state": "still",
                    "height": 400,
                    "data-index": [i]
                });

                // create button to request more gifs
                // var loadMore = $("<button>").attr("id", "loadMore");

                // append image to page
                gifsDiv.append(image);

                // put gifs on page;
                $("#gifSection").append(gifsDiv);

                // PULL INFO

                var title = results[i].title;
                var rating = results[i].rating;
                var link = imgUrl.original.url;

                var pullInfo = $("<div class='info'>").html
                    ("<p class='title'>" + title + "</p><p class='rating'>rating: " + rating + "</p><p><button id='favorite'>&hearts;</button><a href='" + link + "' download><button id='download'>&darr;</button></a></p>").hide();

                gifsDiv.append(pullInfo);

                // SHOW/HIDE INFO

                $(".info").hide();

                $(".gifContainer").on("mouseenter", function () {
                    $(this).find(".info").show();
                }).on("mouseleave", function () {
                    $(this).find(".info").hide();
                }).on("click", "#favorite", function () {
                    var fav = $(this);
                    console.log(fav);
                })

                // var fav = $(this).find(".gif").attr("data-still");
                

                    // $("#favorite").on("click", function () {
                    //     console.log(favorite);
                    // });

                // // ADD GIF TO FAVORITES
                // $("#favorite").on("click", function () {
                //     var favorite = $(this).find("#gif").attr("data-still");
                //     console.log(favorite);
                // })

            }

            // create loadMore button
            // add to queryUrl ----> offset = 10; need global var for offset
            // set that global var to 10 every time you click on one of your buttons
            // every tim eu click on the button, add 10 to that, so if you click again you get the next 10
            

            // START/STOP ANIMATION

            // gifs are set to be still by default
            // this function allows user to turn animation on/off with a click
            $(".gif").on("click", function () {

                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });


        });

    }

    ///// EVENT LISTENERS /////////////

    // SHOW/HIDE FORM
    $("#formButton").click(function(){
        $("#gifForm").animate({width: 'toggle'}); 
    });

    // activates gifBtn functionality
    $("#buttons").on("click", ".gifBtn", showGifs);

    // function to add a button
    $("#gifSubmit").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var userTopic = $("#gifInput").val().trim();

        // Adding topic from the textbox to our array
        topics.push(userTopic);

        // Calling renderButtons which handles the processing of our topics array
        makeBtns();

        $("#gifForm").hide();

    });

    ///// CALLING FUNCTIONS //////////////////

    makeBtns();

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


    ///// END ////////////////////////////

});
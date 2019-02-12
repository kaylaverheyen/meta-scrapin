

$.getJSON("/articles", function (data) {

    for (var i = 0; i < data.length; i++) {

        //$("#articles").append("<div class='jumbotron'><p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br/>" + data[i].summary + "</p></div>");
        $("#articles").append("<div class='jumbotron'><div class='abc' data-id='" + data[i]._id + "'><a href='" + data[i].link + "'><h4>" + data[i].title + "</h4></a><p>" + data[i].summary + "</p></div></div>");
    }
});


//load scraped articles. 

$("#scrape_btn").on("click", function () {

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
        });
});


$(document).on("click", ".abc", function () {

    $("#notes").empty();

    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })

        .then(function (data) {
            console.log(data);

            $("#notes").append("<h2>" + data.title + "</h2>");

            $("#notes").append("<input id='titleinput' name='title' >");

            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");


            if (data.note) {

                $("#titleinput").val(data.note.title);

                $("#bodyinput").val(data.note.body);
            }
        });
});




$(document).on("click", "#savenote", function () {

    var thisId = $(this).attr("data-id");


    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {

            title: $("#titleinput").val(),

            body: $("#bodyinput").val()
        }
    })

        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});

//delete the note 
$(document).on("click", ".delete", function () {

    $.ajax({
        method: "DELETE",
        url: "/api/delete-favorite/" + $(this).attr("id")
    })

    $(this).closest("div").remove();
});


// $.getJSON("/articles", function (data) {
//     // For each one
//     for (var i = 0; i < data.length; i++) {
//         // Display the apropos information on the page
//         $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br/>" + data[i].summary + "</p>");
//     }
// });



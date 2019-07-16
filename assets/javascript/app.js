$(document).ready(function () {
    console.log("hello world");
    //-----------code to make the ingredient buttons and display them----------------------
    //Initial Array of Ingredients
    var pantry = ["eggs", "milk", "bread", "chicken", "onion"];

    //empty array to put meal ingredients in
    var meal = [];

    // Function for displaying buttons that first clears the div holding the buttons, then re-adds what is in the pantry array
    function pantryButtons() {
        $("#pantryButtons").empty();
        for (var i = 0; i < pantry.length; i++) {
            $("#pantryButtons").append("<button class='btn btn-info m-2 pantryButton' data-name='" + pantry[i] + "'>" + pantry[i] + "</button>");
        }
    };

    //function to add a new ingredient to the pantry buttons after typing it in the input box
    //lucas added input verificatino, maybe add a message thru modals 
    $("#addButton").on("click", function (event) {
        var button = $("input").val().trim();
        if (pantry.indexOf(button) === -1 && button !== "") {
            $("input").val("");
            pantry.push(button);
            pantryButtons();
        }
    });


    //function display ingredients for meal when clicking the button and push ingredients to an array
    $(document).on("click", ".pantryButton", function () {
        var food = $(this).attr("data-name");
        if (meal.indexOf(food) === -1) {
            console.log(food);
            var target = $("#ing-to-cook")
            var helper = $("<tr id='" + food + "-id'>");
            helper.append("<td>" + food + "<button class='btn btn-danger' id='delete-from-fridge' data='"+food+"'><h4>-</h4></button> </td>");
            //push ingredient into array
            target.append(helper);
            meal.push(food);
            console.log(meal);
        }

    });
    $(document).on("click", "#delete-from-fridge", function () {
        food = $(this).attr("data");
        $("#" + food + "-id").remove();
        console.log(meal.indexOf(food));
        meal.splice(meal.indexOf(food),1);
        console.log(meal);
    });


    //-----------code for using the Edamam App------------------ 
    //var ingredients = "chicken,tomato,bread"


    //-------------------------------------------------------------------------------------------------------



    //on click to take "meal" and insert them as ingredients into the query search
    $(document).on("click", "#findRecipe", function () {
        var queryURL = "https://api.edamam.com/search?q=" + meal + "&app_id=b9932fef&app_key=351d24d69e849db0f8fe16f88161a9e7&from=0&to=8";
        console.log(queryURL);

        //Ajax call for Edamam API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < response.hits.length; i++) {
                $("#recipeDisplay").append("<img class='m-2' src='" + response.hits[i].recipe.image + "'<img>")
            }
        });

    });

    pantryButtons();
})
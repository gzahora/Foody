$(document).ready(function () {
    //-----------code to make the ingredient buttons and display them----------------------
    //Initial Array of Ingredients
    var pantry = ["eggs", "milk", "bread", "chicken", "onion"];

    //empty array to put meal ingredients in
    var meal = [];
    var pointer = 0;
    var recipeList = [];
    // Function for displaying buttons that first clears the div holding the buttons, then re-adds what is in the pantry array
    function pantryButtons() {
        $("#pantry-buttons").empty();
        for (var i = 0; i < pantry.length; i++) {
            $("#pantry-buttons").append("<button class='btn btn-info m-2 pantryButton' data-name='" + pantry[i] + "'>" + pantry[i] + "</button>");
        }
    };

    //function to add a new ingredient to the pantry buttons after typing it in the input box
    //lucas added input verificatino, maybe add a message thru modals 
    $("#add-button").on("click", function (event) {
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
            helper.append("<td>" + food + "<button class='btn btn-danger' id='delete-from-fridge' data='" + food + "'>-</button> </td>");
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
        meal.splice(meal.indexOf(food), 1);
        console.log(meal);
    });


    //-----------code for using the Edamam App------------------ 
    //var ingredients = "chicken,tomato,bread"


    //-------------------------------------------------------------------------------------------------------



    //on click to take "meal" and insert them as ingredients into the query search
    $(document).on("click", "#findRecipe", function () {
        $("#recipeDisplay").empty();
        var queryURL = "https://api.edamam.com/search?q=" + meal + "&app_id=b9932fef&app_key=351d24d69e849db0f8fe16f88161a9e7&from=0&to=8";
        console.log(queryURL);


        //Ajax call for Edamam API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.hits.length; i++) {
                var recipeContainer = "<div class='card m-1 d-block w-100 ' style='width: 18rem; '><img src='" + response.hits[i].recipe.image + "'class='card-img-top'><div class='card-body'><h5 class='card-title'>'" + response.hits[i].recipe.label + "'</h5><p class='card-text'> Calories: " + Math.round(response.hits[i].recipe.calories) + "</p><p class='card-text'> Serving-Size: " + response.hits[i].recipe.yield + "</p><p class='card-text'> Source: " + response.hits[i].recipe.source + "</p></div><div class='card-body'><a href='" + response.hits[i].recipe.url + "'  target='_blank' class='card-link btn btn-danger'>Recipe</a></div></div>";
                recipeList.push(recipeContainer);
            }
            $("#recipeDisplay").append("<button class='btn btn-light' id='prev'>&#x2190</button>");
            $("#recipeDisplay").append(recipeList[pointer]);
            $("#recipeDisplay").append("<button class='btn btn-light' id='next'>&#x2192</button>");
            console.log(pointer);
        });

        $("#musicDisplay").empty();

        var youtubeKey = "AIzaSyBAfUGa2aYPYpeGNqgvVZobAK1o3OkK5fc";
        var youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + meal + ",songs&type=video&videoCategoryId=10&videoCategoryId=song&type=video&key=" + youtubeKey;
        console.log(youtubeURL);  

        $.ajax({
            url: youtubeURL,
            method: "GET"
        }).then(function (action) {
            console.log(action);
            

            

            var musicPlayer = $("<iframe width='420' height='315' src=https://www.youtube.com/embed/" + action.items[0].id.videoId + "?playlist=" + action.items[0].id.videoId + "&loop=1></iframe>")
            
               
                $("#musicDisplay").append(musicPlayer);
            
   
        });


    });
    $(document).on("click", "#next", function () {
        if (pointer < 7) {
            pointer++;
        }
        else {
            pointer = 0;
        };
        console.log(pointer);
        $("#recipeDisplay").empty()
        $("#recipeDisplay").append("<button class='btn btn-light' id='prev'>&#x2190</button>");
        $("#recipeDisplay").append(recipeList[pointer]);
        $("#recipeDisplay").append("<button class='btn btn-light' id='next'>&#x2192</button>");

    })
    $(document).on("click", "#prev", function () {
        if (pointer > 1) {
            pointer--;
        }
        else {
            pointer = 7;
        };
        console.log(pointer);
        $("#recipeDisplay").empty()
        $("#recipeDisplay").append("<button class='btn btn-light' id='prev'>&#x2190</button>");
        $("#recipeDisplay").append(recipeList[pointer]);
        $("#recipeDisplay").append("<button class='btn btn-light' id='next'>&#x2192</button>");

//---------------------Ajax call for Youtube API--------------------------------------------------------------------------------------------------------------------



    });
        pantryButtons();
});

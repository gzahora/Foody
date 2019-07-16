//-----------code to make the ingredient buttons and display them----------------------
//Initial Array of Ingredients
var pantry = ["eggs","milk","bread","chicken", "onion"];

//empty array to put meal ingredients in
var meal = [];

 // Function for displaying buttons that first clears the div holding the buttons, then re-adds what is in the pantry array
 function pantryButtons() {
    $("#pantryButtons").empty();
    for (var i = 0; i < pantry.length; i++){
        $("#pantryButtons").append("<button class='btn btn-info m-2 pantryButton' data-name='" + pantry[i] + "'>" + pantry[i] + "</button>");
      }
};

//function to add a new ingredient to the pantry buttons after typing it in the input box
$("#addButton").on("click", function(event) {
  event.preventDefault();
  var button = $("input").val().trim();
  pantry.push(button);
  pantryButtons();
  return false;
});


//function display ingredients for meal when clicking the button and push ingredients to an array
$(document).on("click",".pantryButton", function(){
    var food = $(this).attr("data-name");
    console.log(food);

    var ingredientContainer = $("<div style='display: inline-block' class='m-2'>");
    $("#ingredientDisplay").append(ingredientContainer);
    
    //display the ingredient
    $(ingredientContainer).append("<p><strong>" + food + "</strong></p>");

    //push ingredient into array
    meal.push(food);
    console.log(meal);
    
});


//-----------code for using the Edamam App------------------ 


//on click to take "meal" and insert them as ingredients into the query search
$(document).on("click","#findRecipe", function(){
    var queryURL = "https://api.edamam.com/search?q=" + meal + "&app_id=b9932fef&app_key=351d24d69e849db0f8fe16f88161a9e7&from=0&to=8";
    $("#recipeDisplay").empty();
console.log(queryURL);

//Ajax call for Edamam API
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);


    for(var i = 0; i < response.hits.length; i++){
        //var recipeContainer = $("<div class='card'>");
        //$("#recipeDisplay").append(recipeContainer);
        //$(recipeContainer).append("<img src='" + response.hits[i].recipe.image + "'<img>")
        //$(recipeContainer).append("<div class='card-body><h5 class='card-title" + response.hits[i].recipe.label + "</h5></div>")
      //}
  

var recipeContainer = $("<div style='display: inline-block'><div class='card m-1' style='width: 18rem;'><img src='" + response.hits[i].recipe.image + "'class='card-img-top'><div class='card-body'><h5 class='card-title'>'" + response.hits[i].recipe.label + "'</h5><p class='card-text'> Calories: " + response.hits[i].recipe.calories + "</p><p class='card-text'> Serving-Size: " + response.hits[i].recipe.yield + "</p><p class='card-text'> Source: " + response.hits[i].recipe.source + "</p></div><div class='card-body'><a href='" + response.hits[i].recipe.url + "'class='card-link btn btn-primary'>Recipe</a></div></div></div>"
)
$("#recipeDisplay").append(recipeContainer);
    }
});

});

//-----------------------------------------------------------------------------------------------------------------------------------

pantryButtons();
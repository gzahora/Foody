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
//var ingredients = "chicken,tomato,bread"


//-------------------------------------------------------------------------------------------------------



//on click to take "meal" and insert them as ingredients into the query search
$(document).on("click","#findRecipe", function(){
    var queryURL = "https://api.edamam.com/search?q=" + meal + "&app_id=b9932fef&app_key=351d24d69e849db0f8fe16f88161a9e7&from=0&to=8";
console.log(queryURL);

//Ajax call for Edamam API
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);

    for(var i = 0; i < response.hits.length; i++){
        $("#recipeDisplay").append("<img class='m-2' src='" + response.hits[i].recipe.image + "'<img>")
    }
});

});

pantryButtons();
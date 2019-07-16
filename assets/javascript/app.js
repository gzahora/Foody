
  //var ingredients = $("#ingredients");
 
 var ingredients = "chicken,tomato,bread"

var queryURL = "https://api.edamam.com/search?q=" + ingredients + "&app_id=b9932fef&app_key=351d24d69e849db0f8fe16f88161a9e7&from=0&to=15";
console.log(queryURL);

//Ajax call for Edamam API
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
});

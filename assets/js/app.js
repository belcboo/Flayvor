// $(document).ready(function() {

var storeResponse;
var countStart = 0;
var countEnd = 3;
var cPrinted = 0;
var type = "";


var general = {
  start: function() {
    $('#main-container').hide();
    $("#card1").hide();
    $("#card2").hide();
    $("#card3").hide();
    $('#lessButton').hide();
    $('#moreButton').hide();
    $('.parallax').parallax();
  },
  mlButton: function() {
    if (countStart === 0) {
      $('#lessButton').hide();
      $('#moreButton').hide();
    } else if (countStart > 0 && countStart < 3) {
      $('#lessButton').hide();
      $('#moreButton').show();
    } else if (countStart >= 3) {
      $('#lessButton').show();
      $('#moreButton').show();
    }
  },
  more: function() { //Shows 3 more recipies.
    if (type === "food") {
      food.print()();
    } else {
      drinks.print();
    }
  },

  less: function() {
    countStart -= 6;
    if (type === "food") {
      food.print()();
    } else {
      drinks.print();
    }
  }
}

var food = {
  pull: function() {
    countStart = 0; //Returns countStart to 0
    var ingredients = $("#ingredients").val(); //Assign text typed by user to variable ingridients.
    var Uri = " https://api.edamam.com/search?q=" //Default start of API Url
    var Api = "&app_id=951c44a9&app_key=10fce9b48db6f70dd8fec5472069d5f7&from=0&to=30" //Default end of the API Url.
    var queryUrl = Uri + ingredients + Api; //Merge the start + the ingridients typed by user + the end of the API Url.
    $("#ingredients").val(""); //Cleans input
    console.log(queryUrl);
    $.ajax({ //Using ajax to get the json that contains the recipies.
      url: queryUrl,
      method: "GET"
    }).then(function(response) { //Stores the JSON obtained in the temp variable "response"
      storeResponse = response; //Saves JSON response to local variable in case we need to use response in the future.
      console.log(storeResponse);
      food.print(); //Calls the "printer"
    })
  },
  print: function() {
    $("#cimg-1").attr("src", storeResponse.hits[countStart].recipe.image);
    $('#ccont-1').text(storeResponse.hits[countStart].recipe.label);
    var ingCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
    for (var m = 0; m < ingCount; m++) { //This for loop is in charge of adding the lines of ingridients to the Card Reveal.
      $('#cul-1').text("<li>" + storeResponse.hits[countStart].recipe.ingredientLines[m] + "</li>");
    };
    countStart++;
    $("#card1").show();
    $("#cimg-2").attr('src', storeResponse.hits[countStart].recipe.image);
    $('#ccont-2').text(storeResponse.hits[countStart].recipe.label);
    var ingCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
    for (var m = 0; m < ingCount; m++) { //This for loop is in charge of adding the lines of ingridients to the Card Reveal.
      $('#cul-2').text("<li>" + storeResponse.hits[countStart].recipe.ingredientLines[m] + "</li>");
    };
    countStart++;
    $("#card2").show();
    $("#cimg-3").attr('src', storeResponse.hits[countStart].recipe.image);
    $('#ccont-3').text(storeResponse.hits[countStart].recipe.label);
    var ingCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
    for (var m = 0; m < ingCount; m++) { //This for loop is in charge of adding the lines of ingridients to the Card Reveal.
      $('#cul-3').text("<li>" + storeResponse.hits[countStart].recipe.ingredientLines[m] + "</li>");
    };
    countStart++;
    $("#card3").show();
    general.mlButton();

  },
};

var drinks = {
  pull: function() {
    countStart = 0; //Reset Start Count to 0.
    cPrinted = 0;
    var ingredients = $("#ingredients").val().trim(); //Get the ingridients typed by user.
    var uri = "https://thecocktaildb.com/api/json/v1/1/filter.php?i="; //Base QueryURL.
    var queryUrl = uri + ingredients; //Merge variables to create Query URL.
    $("#ingredients").val(""); //Clears user typed recipies.
    console.log(queryUrl); //Console the QueryURL.
    $.ajax({ //Using ajax to get the json that contains the recipies.
      url: queryUrl,
      method: "GET"
    }).then(function(response) { //Stores the JSON obtained in the temp variable "response"
      storeResponse = response; //Saves JSON response to local variable in case we need to use response in the future.
      console.log(storeResponse); //Console log the JSON.
      drinks.print(); //Calls the "printer"
    });
  },
  print: function() {
    var drinkLen = storeResponse.drinks.length;
    console.log(drinkLen, countStart, cPrinted);
    for (var x = 0; x < 3; x++){
      if (cPrinted < drinkLen) {
        $("#cimg-1").attr("src", storeResponse.drinks[countStart].strDrinkThumb);
        $('#ccont-1').text(storeResponse.drinks[countStart].strDrink);
        console.log("inside 1");
        // var ingCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
        // for (var m = 0; m < ingCount; m++) { //This for loop is in charge of adding the lines of ingridients to the Card Reveal.
        //   $('#cul-1').text("<li>" + storeResponse.hits[countStart].recipe.ingredientLines[m] + "</li>");
        // };
        countStart++;
        cPrinted++;
        $("#card1").show();
      } else if (cPrinted < drinkLen) {
        $("#cimg-2").attr('src', storeResponse.drinks[countStart].strDrinkThumb);
        $('#ccont-2').text(storeResponse.drinks[countStart].strDrink);
        console.log("inside 2");
        // // var ingCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
        // // for (var m = 0; m < ingCount; m++) { //This for loop is in charge of adding the lines of ingridients to the Card Reveal.
        // //   $('#cul-2').text("<li>" + storeResponse.hits[countStart].recipe.ingredientLines[m] + "</li>");
        // // };
        countStart++;
        cPrinted++;
        $("#card2").show();
      } else if (cPrinted < drinkLen) {
        $("#cimg-3").attr('src', storeResponse.drinks[countStart].strDrinkThumb);
        $('#ccont-3').text(storeResponse.drinks[countStart].strDrink);
        console.log("inside 3");
        // // var ingCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
        // // for (var m = 0; m < ingCount; m++) { //This for loop is in charge of adding the lines of ingridients to the Card Reveal.
        // //   $('#cul-3').text("<li>" + storeResponse.hits[countStart].recipe.ingredientLines[m] + "</li>");
        // // };
        countStart++;
        cPrinted++;
        $("#card3").show();
      }
    }
      general.mlButton();

  },
};
//Execute the start function
general.start();



$('#food-button').click(function() {
  type = "food";
  console.log(type);
  $("#main-container").show();
});

$('#drink-button').click(function() {
  type = "drinks";
  console.log(type);
  $("#main-container").show();
});

$('#flavorize-button').click(function() {
  if (type === "food") {
    food.pull();
  } else {
    drinks.pull();
  }
});

$("#moreButton").on("click", function() {
  general.more();
});

$("#lessButton").on("click", function() {
  general.less();
});

// });

$('.sidenav').sidenav({
  menuWidth: 300,
  edge: 'right',
  closeOnClick: true,
  draggable: true,
  // onOpen: function(el)
  // onClose: function(el)

});
// // Show sideNav
// $('.sidenav').sidenav('show');
// // Hide sideNav
// $('.sidenav').sidenav('hide');
// // Destroy sideNav
// $('.sidenav').sidenav('destroy');





$('.chips').chips();
$('.chips-placeholder').chips({
  placeholder: 'Add ingredient...',
  secondaryPlaceholder: 'add more...',
});




// $('.sidenav-trigger').Sidenav({
//   menuWidth: 300, // Default is 240
//   closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
//   edge: 'right',
// }
// );
// $("[data-target=slide-out-r]").Sidenav({
//   edge: 'right'
// });
// $(".sidenav-trigger").Sidenav({
//   menuWidth: 300,
//   edge: 'right',
//   closeOnClick: true
// });


//****************************************************************************************//
//************************************API's***********************************************//

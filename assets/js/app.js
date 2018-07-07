// $(document).ready(function() {

var storeResponse;
var storeDrinks = []
var counter = 0;
var indNuber = 0;
var countStart = 0;
var countEnd = 3;
var type = "";


$('#main-container').hide();
$('#flavorize-button').hide();
$('#search-div').hide();
$('#lessButton').hide();
$('#moreButton').hide();
$('.parallax').parallax();

var general = {
  mlButton: function() {
    if (countStart === 0) {
      $('#lessButton').hide();
      $('#moreButton').hide();
    } else if (countStart === 3) {
      $('#lessButton').hide();
      $('#moreButton').show();
    } else if (countStart >= 3 && countEnd < 27) {
      $('#lessButton').show();
      $('#moreButton').show();
    } else if (countEnd > 27) {
      $('#lessButton').show();
      $('#moreButton').hide();
    }
  },
  more: function() { //Shows 3 more recipies.
    countEnd += 3;
    if (type === "food") {
      food.print();
    } else {
      storeDrinks = [];
      drinks.pullRecipes();
    }
  },

  less: function() {
    countStart -= 6;
    countEnd -= 3;
    if (type === "food") {
      food.print()();
    } else {
      storeDrinks = [];
      drinks.pullRecipes();
    }
  }
}

var food = {
  pull: function() {
    countStart = 0;
    countEnd = 3; //Returns countStart to 0
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
    $("#top-recipes").empty(); //Cleans DIV where car's are gonna be generated
    for (countStart; countStart < countEnd; countStart++) { //Runs a defined amount of times to create Cards.
      var col = $("<div>");
      var card = $("<div>");
      var cardImg = $("<div>");
      var cardImgSrc = $("<img>");
      var cardCont = $("<div>");
      var cardContSp = $("<span>");
      var cardContUrl = $("<p>");
      var cardRev = $("<div>");
      var cardRevSp = $("<span>");
      var cardRevP = $("<p>");
      var cardRevUl = $("<ul>");
      col.attr('class', "col s12 m4 l4"); //Creates column
      card.attr('class', "card"); //Creates div for card.
      cardImg.attr('class', "card-image waves-effect waves-block waves-light"); //Add classes for Materialize CSS to the img div
      cardImgSrc.attr('class', 'activator'); //Add classes to image Source.
      cardImgSrc.attr('id','card-image'); //Adds ID to modify witdh on CSS.
      cardImgSrc.attr('src', storeResponse.hits[countStart].recipe.image); //Adds url with source of image.
      cardImg.append(cardImgSrc); //Append child div into the 'mother div'
      cardCont.attr('class', 'card-content'); //Adds materialize classes.
      cardContSp.attr('class', 'card-title activator grey-text text-darken-4');
      cardContSp.append(storeResponse.hits[countStart].recipe.label + '<i class="material-icons right">more_vert</i>');
      cardContUrl.append('<a href="' + storeResponse.hits[countStart].recipe.url +'" target="_blank">Instructions.</a>');
      cardCont.append(cardContSp); // Appends div inside 'mother div'
      cardCont.append(cardContUrl); // Appends div inside 'mother div'
      cardRev.attr('class', 'card-reveal'); //Adds classes of Materialize
      cardRevSp.attr('class', 'card-title grey-text text-darken-4'); //Adds classes of Materialize
      cardRevSp.append('Ingredients<i class="material-icons right">close</i>'); //Adds content as title to div.
      var ingCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
      for (var m = 0; m < ingCount; m++) { //This for loop is in charge of adding the lines of ingridients to the Card Reveal.
        cardRevUl.append("<li>" + storeResponse.hits[countStart].recipe.ingredientLines[m] + "</li>");
      };
      cardRevP.append(cardRevUl); //Appends div inside 'mother div'
      cardRev.append(cardRevSp); //Appends div inside 'mother div'
      cardRev.append(cardRevP); //Appends div inside 'mother div'
      card.append(cardImg); //Adds all the 'mother divs' inside card Div
      card.append(cardCont); //Adds all the 'mother divs' inside card Div
      card.append(cardRev); //Adds all the 'mother divs' inside card Div
      col.append(card); //Adds card div inside col div.
      $("#top-recipes").append(col); //Adds cold div inside row.
    }
    general.mlButton(); //Calls function to display more or less button.
  },
};

var drinks = {
  pull: function() {
    countStart = 0; //Reset Start Count to 0.
    countEnd = 3;
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
      drinks.pullRecipes(); //Calls the "printer"
    });
  },

  pullRecipes: function() {
    var counta = countStart //Assign value of general counters in order to avoid play with the general counter.
    var countb = countEnd; //Assign value of general counters in order to avoid play with the general counter.
    for (counta; counta < countb; counta++) { //Pulls the detailed recipe of each drink and store it inside an array.
      var queryDrink = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + storeResponse.drinks[counta].idDrink;
      $.ajax({
        url: queryDrink,
        method: "GET"
      }).then(function(drinkResponse) {
        storeDrinks.push(drinkResponse);
      });
    }
    drinks.print(); //Calls the printer function/
  },

  print: function() {
    $("#top-recipes").empty(); //Cleans div where recipes are gonna be printed.
    for (countStart; countStart < countEnd; countStart++) { //Creates a card for each drink, includes image and name and all the internal code...
      var col = $("<div>"); //...later process the addition of the ingridients. This function only uses the first pull.
      var card = $("<div>");
      var cardImg = $("<div>");
      var cardImgSrc = $("<img>");
      var cardCont = $("<div>");
      var cardContSp = $("<span>");
      var cardContUrl = $("<p>");
      var cardRev = $("<div>");
      var cardRevSp = $("<span>");
      var cardRevP = $("<p>");
      var cardRevUl = $("<ul>");
      col.attr('class', "col s12 m4 l4");
      card.attr('class', "card");
      cardImg.attr('class', "card-image waves-effect waves-block waves-light");
      cardImgSrc.attr('class', 'activator');
      cardImgSrc.attr('id','card-image');
      cardImgSrc.attr('src', storeResponse.drinks[countStart].strDrinkThumb);
      cardImg.append(cardImgSrc);
      cardCont.attr('class', 'card-content');
      cardContSp.attr('class', 'card-title activator grey-text text-darken-4');
      cardContSp.attr('id', 'drinkName-' + countStart);
      cardContSp.attr('drinkn', storeResponse.drinks[countStart].strDrink);
      cardContSp.append(storeResponse.drinks[countStart].strDrink + '<i class="material-icons right">more_vert</i>');
      cardCont.append(cardContSp);
      cardRev.attr('class', 'card-reveal');
      cardRevSp.attr('class', 'card-title grey-text text-darken-4');
      cardRevSp.append('Ingredients<i class="material-icons right">close</i>');
      cardRevUl.attr('id', 'list-' + [counter]);
      cardRevP.append(cardRevUl);
      cardRev.append(cardRevSp);
      cardRev.append(cardRevP);
      card.append(cardImg);
      card.append(cardCont);
      card.append(cardRev);
      col.append(card);
      $("#top-recipes").append(col);
      counter++;
    }
    countStart -= 3; //Return count start to the value befor run this function.
    drinks.list(); //Call the function that 'prints' the ingridients and recipes.
  },

  list: function() {
    setTimeout(function() { //Adds a delay of 1 second in order to wait the second pull to finish. (1 Pull per drink).
      for (countStart; countStart < countEnd; countStart++) { //This loop is in charge of print the recipes.
        var g = 0;
        var h = 3;
        for (g; g < h; g++) { //This for loop is in charge of validate the right recipe.
          var dName = $("#drinkName-" + countStart).attr("drinkn"); //Pulls the name of the drink to add ingredients from a custom attr.
          var evaluator = storeDrinks[g].drinks[0].strDrink; //Each run has a new name pulled from the 3 jsons pulled in pullRecpes.
          if (dName === evaluator) { //Evalates which of the 3 recipes has the same name as the recipe to work.
            indNuber = g; //Assign that value to inNumber (Number of index) and use it to assign value to the varibales below.
          }
        }
        var ingr0 = storeDrinks[indNuber].drinks[0].strIngredient1;
        var ingr1 = storeDrinks[indNuber].drinks[0].strIngredient2;
        var ingr2 = storeDrinks[indNuber].drinks[0].strIngredient3;
        var ingr3 = storeDrinks[indNuber].drinks[0].strIngredient4;
        var ingr4 = storeDrinks[indNuber].drinks[0].strIngredient5;
        var ingr5 = storeDrinks[indNuber].drinks[0].strIngredient6;
        var ingr6 = storeDrinks[indNuber].drinks[0].strIngredient7;
        var ingr7 = storeDrinks[indNuber].drinks[0].strIngredient8;
        var ingr8 = storeDrinks[indNuber].drinks[0].strIngredient9;
        var ingr9 = storeDrinks[indNuber].drinks[0].strIngredient10;
        var meas0 = storeDrinks[indNuber].drinks[0].strMeasure1;
        var meas1 = storeDrinks[indNuber].drinks[0].strMeasure2;
        var meas2 = storeDrinks[indNuber].drinks[0].strMeasure3;
        var meas3 = storeDrinks[indNuber].drinks[0].strMeasure4;
        var meas4 = storeDrinks[indNuber].drinks[0].strMeasure5;
        var meas5 = storeDrinks[indNuber].drinks[0].strMeasure6;
        var meas6 = storeDrinks[indNuber].drinks[0].strMeasure7;
        var meas7 = storeDrinks[indNuber].drinks[0].strMeasure8;
        var meas8 = storeDrinks[indNuber].drinks[0].strMeasure9;
        var meas9 = storeDrinks[indNuber].drinks[0].strMeasure10;
        var Ingr = [ingr0, ingr1, ingr2, ingr3, ingr4, ingr5, ingr6, ingr7, ingr8, ingr9];
        var Meas = [meas0, meas1, meas2, meas3, meas4, meas5, meas6, meas7, meas8, meas9]
        for (y = 0; y < 10; y++) { //Print the right recipes to the card. **This part was a PITA!**
          $("#list-" + countStart).append("<li>" + Meas[y] + " " + Ingr[y] + "</li>");
        }
        $("#list-" + countStart).append("<h5><p> Instructions </p></h5>")
        $("#list-" + countStart).append("<p>" + storeDrinks[indNuber].drinks[0].strInstructions + "</p>")
      }
      general.mlButton(); //Calls function to display more or less button.
    }, 1000)
  },
};

$('#food-button').click(function() {
  type = "food";
  $("#top-recipes").empty();
  $('#flavorize-button').show();
  $('#search-div').show();
  console.log(type);
});

$('#drink-button').click(function() {
  type = "drinks";
  $("#top-recipes").empty();
  $('#flavorize-button').show();
  $('#search-div').show();
  console.log(type);
});

$('#flavorize-button').click(function() {
  location.hash = "top-recipes";
  if (type === "food") {
    food.pull();
  } else {
    counter = 0;
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

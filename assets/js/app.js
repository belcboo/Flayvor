$(document).ready(function() {
  // $('.sidenav').sidenav();
  $('#main-container').hide();
  $('#top-recipes').hide();
  $('.parallax').parallax();

});

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


var storeResponse;
var countStart = 0;
var countEnd = 3;
var type = "";

var general = {

  // magicButton: function() {
  //   //Shows the more button while the countStart < 90.
  //   if (countStart === 0) {
  //     $("#browseButton").hide();
  //     $("#typer").hide();
  //   } else if (countStart === 10) {
  //     $("#browseButton").show();
  //     $("#lessButton").hide();
  //   } else if (countStart > 10 && countStart < 90) {
  //     $("#lessButton").show();
  //   } else { //Otherwhise hide it.
  //     $("#browseButton").hide();
  //   }
  // },

}

var food = {

  pull: function() {

    //Returns countStart to 0
    countStart += 0;
    //Assign text typed by user to variable ingridients.
    var ingredients = $("#ingredients").val();
    //Default start of API Url
    var Uri = " https://api.edamam.com/search?q="
    //Default end of the API Url.
    var Api = "&app_id=951c44a9&app_key=10fce9b48db6f70dd8fec5472069d5f7&from=0&to=30"

    //Merge the start + the ingridients typed by user + the end of the API Url.
    var queryUrl = Uri + ingredients + Api;

    $("#ingredients").val("");

    console.log(queryUrl);
    //Using ajax to get the json that contains the recipies.
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) { //Stores the JSON obtained in the temp variable "response"

      //Saves JSON response to local variable in case we need to use response in the future.
      storeResponse = response;

      //Clean textbox.

      console.log(storeResponse);
      //Calls the "printer"
      food.print();
    })
  },

  print: function() {

    $("#recipies").empty();

    for (countStart; countStart < countEnd; countStart++) {
      console.log("card",countStart,countEnd);
      var td = $("<td>");
      var card = $("<div>"); //Creates div for card.
      var cardImage = $("<div>"); //Creates div for the image of the card.
      var image = $("<img>"); //
      var cardContent = $("<div>");
      var cardContentSpan = $("<span>");
      var cardP = $("<p>");
      var cardReveal = $("<div>");

      card.attr('class', 'card'); //Add class "card".

      cardImage.attr('class', 'card-image waves-effect waves-block waves-light');
      image.attr('class', 'activator responsive');
      image.attr('src', storeResponse.hits[countStart].recipe.image);
      cardImage.append(image); //Add image inside the div of Card

      cardContent.attr('class', 'card-content');
      cardContent.attr('id', 'card-img');

      cardContentSpan.attr('class', 'card-title activator grey-text text-darken-4');
      cardContentSpan.append(storeResponse.hits[countStart].recipe.label);
      cardContentSpan.append('<i class="material-icons right">more_vert</i>');

      cardContent.append(cardContentSpan);

      cardP.append('<a href="#">This is a link</a>');
      cardContent.append(cardP);

      cardReveal.attr('class','card-title grey-text text-darken-4');
      cardReveal.append(storeResponse.hits[countStart].recipe.label);
      cardReveal.append("<i class='material-icons right'>close</i>");

      card.append(cardImage);
      card.append(cardContent);
      card.append(cardReveal);

      td.append(card);
      console.log(td);
      $("#tds").append(td);

    };

    countEnd += 3;

  },

  //Shows 10 more recipies.
  more: function() {
    countEnd += 10;
    food.print();
  },

  //Goes back 10 recipes.
  less: function() {
    countEnd -= 10;
    countStart -= 20;
    food.print();
  }

};

var drinks = {

  pull: function() {
    //https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka

    var ingredients = $("#ingredients").val().trim();

    var uri = "https://thecocktaildb.com/api/json/v1/1/filter.php?i=";

    var queryUrl = uri + ingredients;

    $("#ingredients").val("");

    console.log(queryUrl);
    //Using ajax to get the json that contains the recipies.
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) { //Stores the JSON obtained in the temp variable "response"

      //Saves JSON response to local variable in case we need to use response in the future.
      storeResponse = response;

      //Clean textbox.

      console.log(storeResponse);
      //Calls the "printer"
      drinks.print();
    })

  },

  print: function() {

    $("#recipies").empty();


    for (countStart; countStart < countEnd; countStart++) {

      var card1 = "";
      var card2 = "";
      var card3 = "";

      for (var x = 0; x < 3; x++) {
        var card = $("<div>"); //Creates div for card.
        var cardImage = $("<div>"); //Creates div for the image of the card.
        var image = $("<img>"); //
        var cardContent = $("<div>");
        var cardContentSpan = $("<span>");
        var cardP = $("<p>");

        card.attr('class', 'card'); //Add class "card".

        cardImage.attr('class', 'card-image waves-effect waves-block waves-light');
        image.attr('class', 'activator');
        image.attr('src', storeResponse.drinks[countStart].hits.image);
        cardImage.append(image); //Add image inside the div of Card

        cardContent.attr('class', 'card-content');
        cardContent.attr('id', 'card-img');

        cardContentSpan.attr('class', 'card-title activator grey-text text-darken-4');
        cardContentSpan.append(storeResponse.drinks[countStart].hits.label);
        cardContentSpan.append('<i class="material-icons right">more_vert</i>');

        cardContent.append(cardContentSpan);

        cardP.append('<a href="#">This is a link</a>');
        cardContent.append(cardP);

        card.append(cardImage);
        card.append(cardContent);

        card[x].append(card);
      };

      $("#showRecipes > tbody").append("<tr><td>" + card1 + "</td><td>" + card2 + "</td></tr>");





      //Create link for 10 recipies inside a p tag.
      // var pTag = $("<p>");
      // var aTag = $("<a>");
      // aTag.attr("drinkid", storeResponse.drinks[countStart].idDrink)
      // aTag.append("", storeResponse.drinks[countStart].strDrink);
      // pTag.append(aTag);
      // $("#recipies").append(pTag);
    }


    // general.magicButton();


  },

  more: function() {

  }


}
//Execute the start function
// general.magicButton();



$('#food-button').click(function() {
  $('#main-container').show();
  console.log('Choice: Food');
  $('#buttons-start').hide();
  type = "food";
});



$('#drink-button').click(function() {
  $('#main-container').show();
  console.log('Choice: Drinks');
  $('#buttons-start').hide();
  type = "drinks";
});


$('#flavorize-button').click(function() {
  $('#top-recipes').show();
  if (type === "food") {
    food.pull();
  } else {
    drinks.pull();
  }
});


$("#moreButton").on("click", function() {
  if (type === "food") {
    food.more();
  } else {
    drinks.more();
  }
});

$("#lessButton").on("click", function() {
  if (type === "food") {
    food.less();
  } else {
    drinks.less();
  }
})

$("#food").on('click', function() {
  type = "food"
  $("#buttons").hide();
  $("#typer").show();
})

$("#drink").on('click', function() {
  type = "drinks";
  $("#buttons").hide();
  $("#typer").show();
})

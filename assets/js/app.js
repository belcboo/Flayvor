<<<<<<< HEAD

$(document).ready(function () {

  //Saved to firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA4z9UNz-9YYl6NIOOX9r7e78bXl8n0kFs",
    authDomain: "flayvor-700bf.firebaseapp.com",
    databaseURL: "https://flayvor-700bf.firebaseio.com",
    projectId: "flayvor-700bf",
    storageBucket: "flayvor-700bf.appspot.com",
    messagingSenderId: "16945531953"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  var fb = {

    read: function () {

      //Create new child to ref database
      database.ref("food").on("child_added", function (snapshot) {

        var ingredient1 = snapshot.val().ingredient;

        $("#test").text(ingredient1);

      });
    },

    write: function () {

      var ingredientDb = $("#ingredients").val().trim();

      console.log(ingredientDb);

      var savedSearch = {
        ingredient: ingredientDb

      }

      //pushing to firebase
      database.ref("food").push(savedSearch);
    }
  }
  fb.write();
  fb.read();



  // $('.sidenav').sidenav();
  $('#main-container').hide();
  $('#top-recipes').hide();
  $('.parallax').parallax();
=======
$(document).ready(function() {

  var storeResponse;
  var countStart = 0;
  var countEnd = 3;
  var type = "";

  var general = {

    start: function(){
      $('#main-container').hide();
      $('#top-recipes').hide();
      $('#lessButton').hide();
      $('#moreButton').hide();
      $('.parallax').parallax();
    },

    magicButton: function() {
      if (countStart === 0) {
        $('#lessButton').hide();
        $('#moreButton').hide();
      }
      else if (countStart >0 && countStart <3) {
        $('#lessButton').hide();
        $('#moreButton').show();
      }
      else{
        $('#lessButton').show();
        $('#moreButton').show();
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
      $("#top-recipes").empty(); //Cleans div where recipies are gonna be 'printed'.
      for (countStart; countStart < countEnd; countStart++) { //Loop to create dinamically a predefined amount of Card Reveals (3 at the moment).
        var ingCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
        var card = $("<div>"); //Holds div for card.
        var cardImage = $("<div>"); //Holds div for the image of the card.
        var image = $("<img>"); //Holds image tag.
        var cardContent = $("<div>"); //Holds div of 'card content'
        var cardContentSpan = $("<span>"); //Holds span inside 'card content'
        var cardP = $("<p>"); //Holds a p tag inside 'card content'
        var cardReveal = $("<div>"); //Holds div for 'Card Reveal'
        var cardRevealSpan = $("<span>"); // Holds span inside 'Cards Reveal'
        var cardRevealP = $("<ul>"); //Holds a P tag inside 'Cards Reveal'

        card.attr('class', 'card col s12 m4'); //Add classes div 'card'.
        card.attr('id', 'recipeCard'); //Adds ID in case is needed to modify CSS.
        cardImage.attr('class', 'card-image waves-effect waves-block waves-light'); //Adds Classes to div 'Card Image'
        image.attr('class', 'activator'); //Adds classes to img tag
        image.attr('src', storeResponse.hits[countStart].recipe.image); //Adds source of the image, imported from JSON.
        cardImage.append(image); //Move the image inside the div 'Card Image'.
        cardContent.attr('class', 'card-content'); //Adds classes to 'Card Content' div.
        cardContentSpan.attr('class', 'card-title activator grey-text text-darken-4'); //Adds classes to Span inside 'Card Content' div.
        cardContentSpan.append(storeResponse.hits[countStart].recipe.label); //Adds the name of recipe to the Card imported from JSON.
        cardContentSpan.append('<i class="material-icons right">more_vert</i>'); //Adds the 3 dots to the right of the card.
        cardContent.append(cardContentSpan); //Moves the span inside 'Card Content' div.
        cardP.append('<a href="#">This is a link</a>'); //Adds a hyperlink to card inside a P tag.
        cardContent.append(cardP); //Moves hyperlink inside 'Card Content' div.
        cardReveal.attr('class', 'card-reveal'); //Adds classes to 'Card Reveal' div.
        cardRevealSpan.attr('class', 'card-title grey-text text-darken-4'); //Adds classes to span inside 'Cards Reveal' div.
        cardRevealSpan.append("Ingridients"); //Adds title inside card's reveal div.
        cardReveal.append("<i class='material-icons right'>close</i>"); //Adds button to close to card reveal div
        cardReveal.append(cardRevealSpan); //Moves card reveal span inside card reveal div.
        var ingridientsCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
        for (var i = 0; i < ingCount; i++) { //This for loop is in charge of adding the lines of ingridients to the Card Reveal.
          cardRevealP.append("<li>" + storeResponse.hits[countStart].recipe.ingredientLines[i] + "</li>");
        }
        cardReveal.append(cardRevealP); //Moves P tag inside card reveal div.
        card.append(cardImage); //Moves Card Image inside the Card div.
        card.append(cardContent); //Moves Card Content inside the Card div.
        card.append(cardReveal); //Moves Card Reveal inside the Card div.
        $("#top-recipes").append(card); //Push the card dinamically inside a specified div on the HTML.
      };
    },


    more: function() { //Shows 3 more recipies.
      countEnd += 3; //Adds 3 to countEnd
      food.print(); //Calls printer function.
    },

    less: function() {
      countEnd -= 3;
      countStart -= 6;
      food.print();
    }

  };

  var drinks = {

      pull: function() {
        countStart = 0; //Reset Start Count to 0.
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
        $("#top-recipes").empty(); //Cleans the div where the recipies are gonna be 'printed'
        for (countStart; countStart < countEnd; countStart++) {
          var ingCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
          var card = $("<div>"); //Holds div for card.
          var cardImage = $("<div>"); //Holds div for the image of the card.
          var image = $("<img>"); //Holds image tag.
          var cardContent = $("<div>"); //Holds div of 'card content'
          var cardContentSpan = $("<span>"); //Holds span inside 'card content'
          var cardP = $("<p>"); //Holds a p tag inside 'card content'
          var cardReveal = $("<div>"); //Holds div for 'Card Reveal'
          var cardRevealSpan = $("<span>"); // Holds span inside 'Cards Reveal'
          var cardRevealP = $("<ul>"); //Holds a P tag inside 'Cards Reveal'

          card.attr('class', 'card col s12 m4'); //Add classes div 'card'.
          card.attr('id', 'recipeCard'); //Adds ID in case is needed to modify CSS.
          cardImage.attr('class', 'card-image waves-effect waves-block waves-light'); //Adds Classes to div 'Card Image'
          image.attr('class', 'activator'); //Adds classes to img tag
          image.attr('src', storeResponse.hits[countStart].recipe.image); //Adds source of the image, imported from JSON.
          cardImage.append(image); //Move the image inside the div 'Card Image'.
          cardContent.attr('class', 'card-content'); //Adds classes to 'Card Content' div.
          cardContentSpan.attr('class', 'card-title activator grey-text text-darken-4'); //Adds classes to Span inside 'Card Content' div.
          cardContentSpan.append(storeResponse.hits[countStart].recipe.label); //Adds the name of recipe to the Card imported from JSON.
          cardContentSpan.append('<i class="material-icons right">more_vert</i>'); //Adds the 3 dots to the right of the card.
          cardContent.append(cardContentSpan); //Moves the span inside 'Card Content' div.
          cardP.append('<a href="#">This is a link</a>'); //Adds a hyperlink to card inside a P tag.
          cardContent.append(cardP); //Moves hyperlink inside 'Card Content' div.
          cardReveal.attr('class', 'card-reveal'); //Adds classes to 'Card Reveal' div.
          cardRevealSpan.attr('class', 'card-title grey-text text-darken-4'); //Adds classes to span inside 'Cards Reveal' div.
          cardRevealSpan.append("Ingridients"); //Adds title inside card's reveal div.
          cardReveal.append("<i class='material-icons right'>close</i>"); //Adds button to close to card reveal div
          cardReveal.append(cardRevealSpan); //Moves card reveal span inside card reveal div.
          var ingridientsCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
          for (var i = 0; i < ingCount; i++) { //This for loop is in charge of adding the lines of ingridients to the Card Reveal.
            cardRevealP.append("<li>" + storeResponse.hits[countStart].recipe.ingredientLines[i] + "</li>");
          }
          cardReveal.append(cardRevealP); //Moves P tag inside card reveal div.
          card.append(cardImage); //Moves Card Image inside the Card div.
          card.append(cardContent); //Moves Card Content inside the Card div.
          card.append(cardReveal); //Moves Card Reveal inside the Card div.
          $("#top-recipes").append(card); //Push the card dinamically inside a specified div on the HTML.

        };


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
  $('#top-recipes').show();
  if (type === "food") {
    food.pull();
  } else {
    drinks.pull();
  }
  general.magicButton();
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
});
>>>>>>> origin

  $('.sidenav').sidenav({
    menuWidth: 300,
    edge: 'right',
    closeOnClick: true,
    draggable: true,
    // onOpen: function(el)
    // onClose: function(el)

<<<<<<< HEAD
  });
  // // Show sideNav
  // $('.sidenav').sidenav('show');
  // // Hide sideNav
  // $('.sidenav').sidenav('hide');
  // // Destroy sideNav
  // $('.sidenav').sidenav('destroy');

  $('#food-button').click(function () {
    $('#main-container').show();
    console.log('Choice: Food');
    $('#buttons-start').hide();
  });



  $('#drink-button').click(function () {
    $('#main-container').show();
    console.log('Choice: Drinks');
    $('#buttons-start').hide();
  });



  $('#flavorize-button').click(function () {
    $('#top-recipes').show();

    fb.write();


  });
=======
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
>>>>>>> origin




<<<<<<< HEAD
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
  var countEnd = 10;
  var type = "";

  var general = {

    magicButton: function () {
      //Shows the more button while the countStart < 90.
      if (countStart === 0) {
        $("#browseButton").hide();
        $("#typer").hide();
      } else if (countStart === 10) {
        $("#browseButton").show();
        $("#lessButton").hide();
      } else if (countStart > 10 && countStart < 90) {
        $("#lessButton").show();
      } else { //Otherwhise hide it.
        $("#browseButton").hide();
      }
    },

  }

  var food = {

    pull: function () {

      //Returns countStart to 0
      countStart += 0;
      //Assign text typed by user to variable ingridients.
      var ingredients = $("#ingredients").val();
      //Default start of API Url
      var Uri = " https://api.edamam.com/search?q="
      //Default end of the API Url.
      var Api = "&app_id=951c44a9&app_key=10fce9b48db6f70dd8fec5472069d5f7&from=0&to=100"

      //Merge the start + the ingridients typed by user + the end of the API Url.
      var queryUrl = Uri + ingredients + Api;

      $("#ingredients").val("");

      console.log(queryUrl);
      //Using ajax to get the json that contains the recipies.
      $.ajax({
        url: queryUrl,
        method: "GET"
      }).then(function (response) { //Stores the JSON obtained in the temp variable "response"

        //Saves JSON response to local variable in case we need to use response in the future.
        storeResponse = response;

        //Clean textbox.

        console.log(storeResponse);
        //Calls the "printer"
        logic.printEdamam();
      })
    },

    print: function () {

      //Cleans DIV to show results.
      $("#recipies").empty();
      //Run for loop to print 10 recipies.
      for (countStart; countStart < countEnd; countStart++) {

        //Create link for 10 recipies inside a p tag.
        var pTag = $("<p>");
        var aTag = $("<a>");
        aTag.attr("href", storeResponse.hits[countStart].recipe.url)
        aTag.attr("target", "_blank");
        aTag.append("", storeResponse.hits[countStart].recipe.label);
        pTag.append(aTag);
        $("#recipies").append(pTag);
      }

      //Call function to check if show or hide the "more button"
      general.magicButton();
    },

    //Shows 10 more recipies.
    more: function () {
      countEnd += 10;
      food.print();
    },

    //Goes back 10 recipes.
    less: function () {
      countEnd -= 10;
      countStart -= 20;
      food.print();
    }

  };

  var drinks = {

    pull: function () {
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
      }).then(function (response) { //Stores the JSON obtained in the temp variable "response"

        //Saves JSON response to local variable in case we need to use response in the future.
        storeResponse = response;

        //Clean textbox.

        console.log(storeResponse);
        //Calls the "printer"
        drinks.print();
      })

    },

    print: function () {

      $("#recipies").empty();


      for (countStart; countStart < countEnd; countStart++) {


        //Create link for 10 recipies inside a p tag.
        var pTag = $("<p>");
        var aTag = $("<a>");
        aTag.attr("drinkid", storeResponse.drinks[countStart].idDrink)
        aTag.append("", storeResponse.drinks[countStart].strDrink);
        pTag.append(aTag);
        $("#recipies").append(pTag);
      }


      general.magicButton();


    },

    more: function () {

    }


  }
  //Execute the start function
  general.magicButton();

  //Click on "Submit" button.
  $("#AddIngredients").on("click", function () {

    if (type === "food") {
      food.pull();
    } else {
      drinks.pull();
    }
  })

  $("#moreButton").on("click", function () {
    if (type === "food") {
      food.more();
    } else {
      drinks.more();
    }
  });

  $("#lessButton").on("click", function () {
    if (type === "food") {
      food.less();
    } else {
      drinks.less();
    }
  })

  $("#food").on('click', function () {
    type = "food"
    $("#buttons").hide();
    $("#typer").show();


  })

  $("#drink").on('click', function () {
    type = "drinks";
    $("#buttons").hide();
    $("#typer").show();
  })











});
=======
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
>>>>>>> origin

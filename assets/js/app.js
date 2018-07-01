
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

// $(document).ready(function() {

var storeResponse;
var storeDrinks;
var countStart = 0;
var cPrinted = 0;
var type = "";
var trending = [];

$('#main-container').hide();
$("#card1").hide();
$("#card2").hide();
$("#card3").hide();
$('#lessButton').hide();
$('#moreButton').hide();
$('.parallax').parallax();

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

function googleLogin() {
  // Start a sign in process for an unauthenticated user.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  // ---------------POPUP-------------------------
  firebase.auth().signInWithPopup(provider).then(function (result) {
    var user = result.user;
    var token = result.credential.accessToken;

    document.write("Hello ${user.displayName}");
    console.log(user)
    console.log(token)
  });
}

//------------------firebase-----------------------

var topRecipes = {

  read: function () {

    database.ref().on('child_added', function (snapshot) {

      var ingredient1 = snapshot.val().ingredient;


      $("#userEmail").append("<p>" + ingredient1 + "</p>");
    });

  },

write: function () {

  var ingredientFb = $("#ingredients").val().trim();
    console.log(ingredientFb);

    var savedSerch = {
      ingredient: ingredientFb
    }

    database.ref().push(savedSerch);

    // trending.on('value', function (snapshot) {
    //   snapshot.forEach(function (trend) {
    //     trending.push({
    //       ip: trend.key,
    //       ingredient: trend.val()
    //     });

    //   })

    // })

  }

}

topRecipes.read();





var general = {
  mlButton: function () {
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
  more: function () { //Shows 3 more recipies.
    if (type === "food") {
      food.print()();
    } else {
      drinks.print();
    }
  },

  less: function () {
    countStart -= 6;
    if (type === "food") {
      food.print()();
    } else {
      drinks.print();
    }
  }
}

var food = {
  pull: function () {
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
    }).then(function (response) { //Stores the JSON obtained in the temp variable "response"
      storeResponse = response; //Saves JSON response to local variable in case we need to use response in the future.
      console.log(storeResponse);
      food.print(); //Calls the "printer"
    })
  },
  print: function () {
    $("#cimg-1").attr("src", storeResponse.hits[countStart].recipe.image);
    $('#ccont-1').text(storeResponse.hits[countStart].recipe.label);
    var ingCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
    for (var m = 0; m < ingCount; m++) { //This for loop is in charge of adding the lines of ingridients to the Card Reveal.
      $('#cul-1').append("<li>" + storeResponse.hits[countStart].recipe.ingredientLines[m] + "</li>");
    };
    countStart++;
    $("#card1").show();
    $("#cimg-2").attr('src', storeResponse.hits[countStart].recipe.image);
    $('#ccont-2').text(storeResponse.hits[countStart].recipe.label);
    var ingCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
    for (var m = 0; m < ingCount; m++) { //This for loop is in charge of adding the lines of ingridients to the Card Reveal.
      $('#cul-2').append("<li>" + storeResponse.hits[countStart].recipe.ingredientLines[m] + "</li>");
    };
    countStart++;
    $("#card2").show();
    $("#cimg-3").attr('src', storeResponse.hits[countStart].recipe.image);
    $('#ccont-3').text(storeResponse.hits[countStart].recipe.label);
    var ingCount = storeResponse.hits[countStart].recipe.ingredientLines.length; //Counts the ingridients included in the recipie.
    for (var m = 0; m < ingCount; m++) { //This for loop is in charge of adding the lines of ingridients to the Card Reveal.
      $('#cul-3').append("<li>" + storeResponse.hits[countStart].recipe.ingredientLines[m] + "</li>");
    };
    countStart++;
    $("#card3").show();
    general.mlButton();
  },
};

var drinks = {
  pull: function () {
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
    }).then(function (response) { //Stores the JSON obtained in the temp variable "response"
      storeResponse = response; //Saves JSON response to local variable in case we need to use response in the future.
      console.log(storeResponse); //Console log the JSON.
      drinks.print(); //Calls the "printer"
    });
  },
  print: function () {
    $("#card1").hide();
    $("#card2").hide();
    $("#card3").hide();
    var drinkLen = storeResponse.drinks.length;
    console.log(drinkLen, countStart);
    for (var x = 0; x < 3; x++) {
      if (x === 0 && countStart < drinkLen) {
        $("#cimg-1").attr("src", storeResponse.drinks[countStart].strDrinkThumb);
        $('#ccont-1').text(storeResponse.drinks[countStart].strDrink);
        console.log("inside 1");
        var queryDrink = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + storeResponse.drinks[countStart].idDrink;
        console.log(queryDrink);
        $.ajax({
          url: queryDrink,
          method: "GET"
        }).then(function (drinkResponse) {
          var ingr0 = drinkResponse.drinks[0].strIngredient1;
          var ingr1 = drinkResponse.drinks[0].strIngredient2;
          var ingr2 = drinkResponse.drinks[0].strIngredient3;
          var ingr3 = drinkResponse.drinks[0].strIngredient4;
          var ingr4 = drinkResponse.drinks[0].strIngredient5;
          var ingr5 = drinkResponse.drinks[0].strIngredient6;
          var ingr6 = drinkResponse.drinks[0].strIngredient7;
          var ingr7 = drinkResponse.drinks[0].strIngredient8;
          var ingr8 = drinkResponse.drinks[0].strIngredient9;
          var ingr9 = drinkResponse.drinks[0].strIngredient10;
          var meas0 = drinkResponse.drinks[0].strMeasure1;
          var meas1 = drinkResponse.drinks[0].strMeasure2;
          var meas2 = drinkResponse.drinks[0].strMeasure3;
          var meas3 = drinkResponse.drinks[0].strMeasure4;
          var meas4 = drinkResponse.drinks[0].strMeasure5;
          var meas5 = drinkResponse.drinks[0].strMeasure6;
          var meas6 = drinkResponse.drinks[0].strMeasure7;
          var meas7 = drinkResponse.drinks[0].strMeasure8;
          var meas8 = drinkResponse.drinks[0].strMeasure9;
          var meas9 = drinkResponse.drinks[0].strMeasure10;
          var qIngr = [ingr0, ingr1, ingr2, ingr3, ingr4, ingr5, ingr6, ingr7, ingr8, ingr9];
          var qMeas = [meas0, meas1, meas2, meas3, meas4, meas5, meas6, meas7, meas8, meas9]
          for (y = 0; y < 3; y++) {
            $("#cul-1").append("<li>" + qMeas[y] + " " + qIngr[y] + "</li>");
          }
        })
        countStart++;
        $("#card1").show();
      } else if (x === 1 && countStart < drinkLen) {
        $("#cimg-2").attr('src', storeResponse.drinks[countStart].strDrinkThumb);
        $('#ccont-2').text(storeResponse.drinks[countStart].strDrink);
        console.log("inside 2");
        var queryDrink = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + storeResponse.drinks[countStart].idDrink;
        console.log(queryDrink);
        $.ajax({
          url: queryDrink,
          method: "GET"
        }).then(function (drinkResponse) {
          var ingr0 = drinkResponse.drinks[0].strIngredient1;
          var ingr1 = drinkResponse.drinks[0].strIngredient2;
          var ingr2 = drinkResponse.drinks[0].strIngredient3;
          var ingr3 = drinkResponse.drinks[0].strIngredient4;
          var ingr4 = drinkResponse.drinks[0].strIngredient5;
          var ingr5 = drinkResponse.drinks[0].strIngredient6;
          var ingr6 = drinkResponse.drinks[0].strIngredient7;
          var ingr7 = drinkResponse.drinks[0].strIngredient8;
          var ingr8 = drinkResponse.drinks[0].strIngredient9;
          var ingr9 = drinkResponse.drinks[0].strIngredient10;
          var meas0 = drinkResponse.drinks[0].strMeasure1;
          var meas1 = drinkResponse.drinks[0].strMeasure2;
          var meas2 = drinkResponse.drinks[0].strMeasure3;
          var meas3 = drinkResponse.drinks[0].strMeasure4;
          var meas4 = drinkResponse.drinks[0].strMeasure5;
          var meas5 = drinkResponse.drinks[0].strMeasure6;
          var meas6 = drinkResponse.drinks[0].strMeasure7;
          var meas7 = drinkResponse.drinks[0].strMeasure8;
          var meas8 = drinkResponse.drinks[0].strMeasure9;
          var meas9 = drinkResponse.drinks[0].strMeasure10;
          var qIngr = [ingr0, ingr1, ingr2, ingr3, ingr4, ingr5, ingr6, ingr7, ingr8, ingr9];
          var qMeas = [meas0, meas1, meas2, meas3, meas4, meas5, meas6, meas7, meas8, meas9]
          for (y = 0; y < 3; y++) {
            $("#cul-2").append("<li>" + qMeas[y] + " " + qIngr[y] + "</li>");
          }
        })
        countStart++;
        $("#card2").show();
      } else if (x === 2 && countStart < drinkLen) {
        $("#cimg-3").attr('src', storeResponse.drinks[countStart].strDrinkThumb);
        $('#ccont-3').text(storeResponse.drinks[countStart].strDrink);
        console.log("inside 3");
        var queryDrink = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + storeResponse.drinks[countStart].idDrink;
        console.log(queryDrink);
        $.ajax({
          url: queryDrink,
          method: "GET"
        }).then(function (drinkResponse) {
          var ingr0 = drinkResponse.drinks[0].strIngredient1;
          var ingr1 = drinkResponse.drinks[0].strIngredient2;
          var ingr2 = drinkResponse.drinks[0].strIngredient3;
          var ingr3 = drinkResponse.drinks[0].strIngredient4;
          var ingr4 = drinkResponse.drinks[0].strIngredient5;
          var ingr5 = drinkResponse.drinks[0].strIngredient6;
          var ingr6 = drinkResponse.drinks[0].strIngredient7;
          var ingr7 = drinkResponse.drinks[0].strIngredient8;
          var ingr8 = drinkResponse.drinks[0].strIngredient9;
          var ingr9 = drinkResponse.drinks[0].strIngredient10;
          var meas0 = drinkResponse.drinks[0].strMeasure1;
          var meas1 = drinkResponse.drinks[0].strMeasure2;
          var meas2 = drinkResponse.drinks[0].strMeasure3;
          var meas3 = drinkResponse.drinks[0].strMeasure4;
          var meas4 = drinkResponse.drinks[0].strMeasure5;
          var meas5 = drinkResponse.drinks[0].strMeasure6;
          var meas6 = drinkResponse.drinks[0].strMeasure7;
          var meas7 = drinkResponse.drinks[0].strMeasure8;
          var meas8 = drinkResponse.drinks[0].strMeasure9;
          var meas9 = drinkResponse.drinks[0].strMeasure10;
          var qIngr = [ingr0, ingr1, ingr2, ingr3, ingr4, ingr5, ingr6, ingr7, ingr8, ingr9];
          var qMeas = [meas0, meas1, meas2, meas3, meas4, meas5, meas6, meas7, meas8, meas9]
          for (y = 0; y < 3; y++) {
            $("#cul-3").append("<li>" + qMeas[y] + " " + qIngr[y] + "</li>");
          }
        })
        countStart++;
        $("#card3").show();
      }
    }

    general.mlButton();

  },
};


$('#food-button').click(function () {
  type = "food";
  console.log(type);
  $("#main-container").show();
});

$('#drink-button').click(function () {
  type = "drinks";
  console.log(type);
  $("#main-container").show();
});

$('#flavorize-button').click(function () {
  if (type === "food") {
    food.pull();
  } else {
    drinks.pull();
  }
  topRecipes.write();
});

$("#moreButton").on("click", function () {
  general.more();
});

$("#lessButton").on("click", function () {
  general.less();
});


// ref google login button.
$("#googleLogin").on("click", function () {
  googleLogin();
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

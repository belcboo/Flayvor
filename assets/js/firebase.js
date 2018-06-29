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
    //Create new child to ref database
    database.ref("top5").on("child_added", function (snapshot) {
        var ingredient = snapshot.val().ingredient;


    });


    var storeResponse;
    var countStart = 0;
    var countEnd = 10;

    var logic = {

        start: function () {
            //Hides 'moreButton' at the beginning
            $("#moreButton").hide();
        },

        edamamGet: function () {

            //Returns countStart to 0
            countStart += 0;
            //Assign text typed by user to variable ingridients.
            var ingredients = $("#typeIngredient").val().trim();
            //Default start of API Url
            var Uri = " https://api.edamam.com/search?q="
            //Default end of the API Url.
            var Api = "&app_id=951c44a9&app_key=10fce9b48db6f70dd8fec5472069d5f7&from=0&to=100"

            //Merge the start + the ingridients typed by user + the end of the API Url.
            var queryUrl = Uri + ingredients + Api;

            $("#typeIngredient").val().trim();

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

        printEdamam: function () {

            //Cleans DIV to show results.
            $("#recipies").empty();


            //Run for loop to print 10 recipies.
            for (countStart; countStart < countEnd; countStart++) {

                //Create link for 10 recipies inside a p tag.
                var pTag = $("<p>");
                var aTag = $("<a>");
                aTag.attr("href", storeResponse.hits[countStart].recipe.url)
                aTag.append("", storeResponse.hits[countStart].recipe.label);
                pTag.append(aTag);
                $("#recipies").append(pTag);
            }

            //Shows the more button while the countStart < 90.
            if (countStart < 90) {
                $("#moreButton").show();
            }
            else { //Otherwhise hide it.
                $("#moreButton").hide();
            }
            //Increase countEnd by 10 to be ready to print 10 more items.
            countEnd += 10;
        }

    };

    //Execute the start function
    logic.start();

    //Click on "Submit" button.
    $("#flavorize-button").on("click", function () {
        //Calls functoin to pull data from edamam API.
        logic.edamamGet();


        //Created new name and value in firebase, using Submit button
        var ingredientDb = $("#flavorize-button").val().trim();
        var savedSearch = {

            ingredient: ingredientDb
        }
        //pushing to firebase
        database.ref("top5").push(savedSearch);

    })

    $("#moreButton").on("click", function () {
        logic.printEdamam(); //Calls printer to show 10 new recipes.
    });





});

      var foods = ["Cheeseburger", "Pizza", "Cake", "Ice Cream", "Hotdogs"];

    
      function displayFoodInfo() {

        var food = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HwvSaJlYIFfCHRGlj1Si6HvACVgynj5p&q=" + food +"&limit=10&offset=0&lang=en";
        console.log(queryURL);
    
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            
            var results = response.data;
	        for (var i = 0; i < results.length; i++) {

          var foodDiv = $("<div class='food'>");

        // GIF Image
          var imgURL = results[i].images.fixed_width.url;
          var image = $("<img>").attr("src", imgURL);
          
          foodDiv.append(image);


        //Ratings
          var rating = results[i].rating;
          var rate = $("<p>").text("Rating: " + rating);

        foodDiv.append(rate);
        
        // Display all GIFS Prior
          $("#food-view").prepend(foodDiv);
                    }
        });


      }

      function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < foods.length; i++) {

          var a = $("<button>");
          a.addClass("food-btn btn-primary btn-lg");
          a.attr("data-name", foods[i]);
          a.text(foods[i]);
          $("#buttons-view").append(a);
        }
      }

      //When button is clicked
      $("#add-food").on("click", function(event) {
        event.preventDefault();
        var newfoods = $("#food-input").val().trim();
        foods.push(newfoods);

        renderButtons();
      });


      $(document).on("click", ".food-btn", displayFoodInfo);

      renderButtons();
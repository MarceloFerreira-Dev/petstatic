$(document).ready(function(){    
     // Array containing the initial pets
      var pet = ["Dog", "Cat", "Bird", "Lion", "rat", "cow", "horse", "eagle", "possum", "donkey", "monkey" ];
      // Function for displaying pet data
      function renderButtons() {
        // Deleting the pet buttons prior to adding new pet buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#pet-view").empty();
        // Looping through the array of animals
        for (var i = 0; i < pet.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("pet btn-primary btn-lg");
          // Adding a data-attribute with a value of the pet at index i
          a.attr("data-name", pet[i]);       
          // Providing the button's text with a value of the pet at index i
          a.text(pet[i]);
          // Adding the button to the HTML
          $("#pet-view").append(a);
        }
      }
      // This function handles events where one button is clicked
      $("#add-pet").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        // This line will grab the text from the input box
        var petbox = $("#pet-input").val().trim();
        // The animal from the textbox is then added to our array
        pet.push(petbox);
        // calling renderButtons which handles the processing of our pet array
        renderButtons();
      });

      $(document).on("click", ".pet", selectPetName);

      function selectPetName(selectPet) {

        var selectPet = $(this).attr("data-name");
      
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+selectPet+"&api_key=ZHCjtfkN29GwTXYBKfJmchoF7dzq5Gex&limit=20";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);

      $("#images").empty();
      
    for (var i = 0; i < response.data.length; i++) {
      var imageUrl = response.data[i].images.fixed_height.url;
      var still  = response.data[i].images.fixed_height.url;
      var anime = response.data[i].images.fixed_height.url;
      var rate = response.data[i].rating;

        //$("#images").prepend(petImage);
        //$("#images").prepend(caption);
        //$("#images").prepend(gallery);
        var div = document.createElement("div");
        var t = document.createTextNode("Rating: " + rate);
        div.appendChild(t);
        document.getElementById("images").appendChild(div);
        $( "div" ).last().attr( "id","galleryID"+ i);
        $( "div" ).last().addClass( "gallery");
                // Creating and storing an image tag
                var petImage = $("<img>");

// Setting the catImage src attribute to imageUrl
              petImage.addClass("img-animate");
              petImage.attr("src", imageUrl);
              petImage.attr("data-state", "animate");
              petImage.attr("alt", "pet image");
              $(petImage).appendTo( "#galleryID" + i );
     

    };

    $(".img-animate").on("click", function() {

      var staticGifSuffix = "_s.gif";
      var gifSuffix = ".gif";
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
     if (state === "still") {

        var originalSrc = $(this).attr("src");
        $(this).attr("src", originalSrc.replace(staticGifSuffix, gifSuffix));
        $(this).attr("data-state", "animate");
      } else {
        var originalSrc = $(this).attr("src");
        $(this).attr("src", originalSrc.replace(gifSuffix, staticGifSuffix));
        $(this).attr("data-state", "still");
     }
  });
 });        
}
      // Calling the renderButtons function at least once to display the initial list of pets.
      renderButtons();
});
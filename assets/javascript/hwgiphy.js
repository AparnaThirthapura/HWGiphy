/*
div id = animalButtons
form id = animal-from
input type is text id = animal-input
input type is submit id = add-animal
div id = animals where animals are to be shown
http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC 
*/  

var animalArray = ["elephant", "hippopotamus", "rhino", "bald eagle", "beaver"];

function showGifs(animal){
  var queryURL1 = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&rating=pg&api_key=dc6zaTOxFJmzC";

  $.ajax({
      url: queryURL1,
      method: "GET"
    }).done(function(response) {
      console.log(response);

      for(var i=0; i<10; i++){
        // console.log(response.data[i].images.fixed_width_small.url);
        // console.log(response.data[i].images.fixed_width_small_still.url);

        var imgSmall = (response.data[i].images.original.url);
        var imgStill = (response.data[i].images.original_still.url);

        var image = $("<img>").addClass("ans-image").attr('src', imgStill).attr("still", imgStill).attr("animated", imgSmall);
        image.on("click", function(){
          if($(this).attr("src") == $(this).attr("still")){
              $(this).attr("src", $(this).attr("animated"));
          }
          else{
            $(this).attr("src", $(this).attr("still"));
          }
        });

        $("#animals-display").append(image);

      }
    });
}

function renderButtons(){
  $("#animal-buttons").empty();

  for(var i=0; i<animalArray.length; i++){
    var button = $("<button>").attr("animalAttr", animalArray[i]).text(animalArray[i]);
    button.on("click", function(){
      $("#animals-display").empty();
      showGifs($(this).attr("animalAttr"));
    });

    $("#animal-buttons").append(button);
  }
}

$("#add-animal").on("click", function(event) {
  
    event.preventDefault();

    var animal = $("#animal-input").val().trim();
    animalArray.push(animal);
    $("#animal-input").val("");
    $("#animals-display").empty();

    showGifs(animal);

    renderButtons();
  });

renderButtons();
// Wait until the document is ready
$(document).ready(function(){

  // URL of the API
  var url = 'https://trektravel.herokuapp.com/trips';

  // Show the list of vacations
  var successCallback = function (response) {
    for (var i=0; i < response.length; i++ ){
      $('#vacations').append("<ul><li><a href=" + url + "/" + response[i].id + ">" + response[i].name + "</a></li><li> Continent:" + response[i].continent + "</li><li> Weeks:" + response[i].weeks + "</li></ul>");
    } // end for loop
  }; // end successCallbank function

  // Click to show the list, then hide the button;
  $('#show_vac').on('click', function(e) {
    $.get(url, successCallback);
    $("#show_vac").hide();
  }); // end onclick function

  // declare a variable (unassigned to start)
  var openStatus;
  console.log(openStatus);

  // Start of vacations on link click function
  $('#vacations').on('click', 'a', function(e) {
    // stop the click on a vacation link from going to url
    e.preventDefault();

    // change display status div single-vac to block
    $('#single_vac').show();

    // set local URL
    var vacUrl = $(this).attr('href');

    // make get request for all the details of a single vacation
    $.get(vacUrl, function(vacation){
      $('#name').text("Vacation Name: " + vacation.name);
      $('#destination').text("Destination: " + vacation.destination);
      $('#continent').text("Continent: " + vacation.continent);
      $('#about').text("About: " + vacation.about);
      $('#category').text("Category: " + vacation.category);
      $('#weeks').text("Weeks: " + vacation.weeks);
      $('#cost').text("Cost: $" + vacation.cost);
      $('#id').text("Vacation ID:" + vacation.id);
      $('#hidden-id').attr("value", vacation.id);

      // reset the form to be blank!
      $('#formname').val("");
      $('#formage').val("");
      $('#formemail').val("");
      // set the open status to true
      openStatus = true;

    }); // end get function
  }); // end of vacation on click function


  // if the open status is true, any click should close the single_vac div.
  $('#vacations').on('click', function(){
    if (openStatus === true) {
      $("#single_vac").hide();
      $("#res_success").hide();
      openStatus = false;
    } // end of the if statement
  }); // end of the body on click function


  // Start of form submit function
  $('form').submit(function(e) {
    // Override the default form submit action
    e.preventDefault();

    // Get the action fromt he form
    var url = $(this).attr("action") + $('#hidden-id').attr("value") + "/reserve";
    console.log(url);

    // Serialize the data! We didn't actually talk about this so I just stole it directly from the lesson.
    var formData = $(this).serialize();

    // Post that shit! Did we ever learn .ajax?? I don't think so?? While posting, close the original window and open another one
    $.post(url, formData, function(response){
      $("#single_vac").hide();
      $("#res_success").show();
    }); //end of post

    // $('#formname').attr("value", "");
    // $('#formage').attr("value", "");
    // $('#formemail').attr("value", "");

  }); //end of form submit

}); // end of complete document.ready statement





//click on a pet, show more information on that pet
//click event, that will make an ajax get request for that specific pet, by ID
// If successful, then have a pop-up with pets info

// $('#pets').on('click', 'a', function(e){
//   e.preventDefault();
//
//   $('#profile').show();
//   var petUrl = $(this).attr('href');
//
//   $.get(petUrl, function(pet){
//     $('#name').text(pet.name);
//     $('#age').text(pet.age);
//     $('#breed').text(pet.breed);
//   }).always(function(){
//     $("#message").text("Something happened");
//   }).fail(function(){
//     alert("Failed.");
//   })
// });





// }); // ending $(document).ready

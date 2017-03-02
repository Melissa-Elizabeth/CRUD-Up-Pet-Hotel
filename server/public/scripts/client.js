$(document).ready function({

//creating a function that gets data from the server and adds it to the petsTable table.
function getDataAddToTable(){
$.ajax({
  type: 'GET',
  url: '/petsTable',
  success: function(response){
    console.log('response', response); //response is an array of pet objects (defined by SQL on client side)
    $('#petsTableBody').empty(); // clears the pets currently in the table
    for (var i = 0; i < response.length; i++) { //Loops through the pets array (the response array)
      var currentPetInfo = response[i]; //More legible for code below
      var $newPetInfo = $('<tr>'); //create a new row for each book
      $newPetInfo.data('id', currentBook.id); //adds data ID to the new book object so we can call it later
      $newPetInfo.append('<td><input value="' + currentPetInfo.owner + '" class="petOwner"></td>'); //show user the title
      $newPetInfo.append('<td><input value="' + currentPetInfo.pet + '" class="petName"></td>'); //show user the author
      $newPetInfo.append('<td><input value="' + currentPetInfo.breed + '" class="petBreed"></td>'); //show user the edition
      $newPetInfo.append('<td><input value="' + currentPetInfo.color + '" class="petColor"></td>');//show user the publisher
      $newPetInfo.append('<td><button class="updateButton">Go</button>');
      $newPetInfo.append('<td><button class="deleteButton">Go</button>');
      $newPetInfo.append('<td><button class="checkInOutButton">In/Out</button>') //create a delete button
      $('#bookShelf').prepend($newBook);
  }
});//ends GET ajax
}//end getDataAddToTable
});

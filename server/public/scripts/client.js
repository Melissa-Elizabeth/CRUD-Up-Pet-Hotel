$(document).ready(function() {
  getDataAddToTable();
  function getDataAddToTable(){
  $.ajax({
    type: 'GET',
    url: '/petsTable',
    success: function(response){
      console.log('response', response); //response is an array of pet objects (defined by SQL on client side)
      $('#petsTableBody').empty(); // clears the pets currently in the table
      for (var i = 0; i < response.length; i++) { //Loops through the pets array (the response array)
        var currentPetInfo = response[i]; //More legible for code below
        var $newPetInfo = $('<tr>'); //create a new row for each pet info
        $newPetInfo.data('id', currentPetInfo.id); //adds data ID to the pet object so we can call it later
        $newPetInfo.append('<td><input value="' + currentPetInfo.first_name + " " + currentPetInfo.last_name + '" class="petOwner"></td>'); //show user the title
        $newPetInfo.append('<td><input value="' + currentPetInfo.pet_name + '" class="petName"></td>'); //show user the author
        $newPetInfo.append('<td><input value="' + currentPetInfo.pet_breed + '" class="petBreed"></td>'); //show user the edition
        $newPetInfo.append('<td><input value="' + currentPetInfo.pet_color + '" class="petColor"></td>');//show user the publisher
        $newPetInfo.append('<td><button class="updateButton">Go</button>');
        $newPetInfo.append('<td><button class="deleteButton">Go</button>');
        $newPetInfo.append('<td><button class="checkInOutButton">In/Out</button>') //create a delete button
        $('#petsTableBody').append($newPetInfo);
        console.log($newPetInfo);
    }
  }
  });//ends GET ajax
  }//end getDataAddToTable

    console.log('jquery was correctly sourced!');
    $('#ownerRegisterButton').on('click', function() {
        console.log('yay, way to click!');
        var newOwner = {};
        var newOwnerFirstName;
        var newOwnerLastName;
        newOwner.newOwnerFirstName = $('#ownerFirstName').val();
        newOwner.newOwnerLastName = $('#ownerLastName').val();
        console.log(newOwner);
        $.ajax({
            type: 'POST',
            url: '/owner',
            data: newOwner,
            success: function(response) {
                console.log(response);
                getDataAddToTable();

            } //end success
        }); //end ajax
    }); // end click


    $('#addPetButton').on('click', addPetClicked);

    function addPetClicked() {
        console.log('you rock as far as clicking goes!');
        var newPetObject = {
            petName: $('#petName').val(),
            breed: $('#breed').val(),
            color: $('#color').val()
        }; // end object
        console.log('newPetObject', newPetObject);
        $.ajax({
            type: 'POST',
            url: '/pet/new',
            data: newPetObject,
            success: function(data) {
                console.log('new pet post', data);
                getDataAddToTable();

            }, // end of success
            error: function(error) {
                console.log('error dude');
            } //end of error
        }); // end of ajax
    } // end of addPetClicked function
}); // end of doc ready

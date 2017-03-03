$(document).ready(function() {
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
            }, // end of success
            error: function(error) {
                console.log('error dude');
            } //end of error
        }); // end of ajax
    } // end of addPetClicked function
}); // end of doc ready

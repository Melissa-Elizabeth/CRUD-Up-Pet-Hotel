$(document).ready(function() {

$('#addPetButton').on('click', addPetClicked);
  function addPetClicked() {
    var newPetObject = {
    owner: $('#ownerName').val(),
    petName: $('#petName').val(),
    breed: $('#breed').val(),
    color: $('#color').val(),
  };
  $.ajax({
      type: 'POST',
      url: '/pet/new',
      data: newPetObject,
      success: function(data){
      },
      error: function(error){
      }
    });
  }
});

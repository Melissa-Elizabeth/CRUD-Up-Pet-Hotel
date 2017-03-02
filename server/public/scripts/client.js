$(document).ready(function() {
            console.log('jquery was correctly sourced!');

            $('#ownerRegisterButton').on('click', function() {
                var newOwner = {};
                var newOwnerFirstName;
                var newOwnerLastName;
                newOwner.newOwnerFirstName = $('#ownerFirstName').val();
                newOwner.newOwnerLastName = $('#ownerLastName').val();
                $('#ownerLastName').val();
                $.ajax({
                    type: 'POST',
                    url: '/owner',
                    data: newOwner,
                    success: function(response) {
                        console.log(response);
                    } //end success
                }); //end ajax
            }); //end doc ready

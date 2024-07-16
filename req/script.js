$(document).ready(function() {
    $("#songRequestForm").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        var name = $("#name").val();
        var songartist = $("#songartist").val();
        var dedication = $("#dedication").val();

        if (name === '' || songartist === '' || dedication === '') {
            Swal.fire({
                title: "Empty Fields",
                text: "Please fill out all fields.",
                icon: "warning",
                button: "OK"
            });
        } else {
            $.ajax({
                url: "https://coolvibes-reloaded.com/req/index.html",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    name: name,
                    songartist: songartist,
                    dedication: dedication
                }),
                success: function(response) {
                    Swal.fire({
                        title: "Request Successful",
                        text: "Your request has been submitted!",
                        icon: "success",
                        button: "OK"
                    });
                },
                error: function(error) {
                    Swal.fire({
                        title: "Error",
                        text: "There was an error submitting your request. Please try again later.",
                        icon: "error",
                        button: "OK"
                    });
                }
            });
        }
    });
});

$("#submit").click(function() {
            var name = $("#name").val();
            var songartist = $("#songartist").val();
            var dedication = $("#dedication").val();

            if (name === '' || songartist === '' || dedication === '') {
                swal({
                    title: "Empty Fields!",
                    text: "Check Missing Field!",
                    icon: "warning",
                    button: "ok!",
                });
            } else {
                $.ajax({
                    type: "POST",
                    url: "https://your-backend-endpoint/submit_request", // Replace with your backend endpoint
                    data: {
                        name: name,
                        songartist: songartist,
                        dedication: dedication
                    },
                    success: function(response) {
                        swal({
                            title: "Request Successful!",
                            text: "Success!",
                            icon: "success",
                            button: "ok!",
                        });
                    },
                    error: function(error) {
                        swal({
                            title: "Error!",
                            text: "Something went wrong. Please try again later.",
                            icon: "error",
                            button: "ok!",
                        });
                    }
                });
            }
        });
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $birthday = $_POST["birthday"];

    // Email message
    $to = "jnlravers@gmail.com";
    $subject = "Birthday Submission";
    $message = "Name: $name\nEmail: $email\nBirthday: $birthday";
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        // Redirect to thank you page
        header("Location: thank_you_page.html");
        exit();
    } else {
        echo "Oops! Something went wrong.";
    }
}
?>

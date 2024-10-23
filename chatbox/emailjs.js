// Initialize EmailJS with your user ID
(function(){
    emailjs.init("coolvibes1989@gmail.com");  // Replace with your EmailJS user ID
})();

// Send email when a new message is posted
function sendMessage(message, fromUser) {
    // Your existing logic for sending a chat message

    // EmailJS parameters for email
    const templateParams = {
        from_name: fromUser,
        message: message,
        to_email: "recipient@example.com"  // Replace with recipient's email
    };

    // Send email using EmailJS
    emailjs.send('service_tyw0opp', 'template_1a91uck', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
        }, function(error) {
            console.error('Failed to send email:', error);
        });
}
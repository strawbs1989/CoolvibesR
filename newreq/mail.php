<?php
 
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use newreq\phpmailer\src\PHPMailer;
use newreq\phpmailer\src\Exception;
 
//required files
require 'newreq/phpmailer/src/Exception.php';
require 'newreq/phpmailer/src/PHPMailer.php';
require 'newreq/phpmailer/src/SMTP.php';
 
//Create an instance; passing `true` enables exceptions
if (isset($_POST["send"])) {
 
  $mail = new PHPMailer(true);
 
    //Server settings
    $mail->isSMTP();                              //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';       //Set the SMTP server to send through
    $mail->SMTPAuth   = true;             //Enable SMTP authentication
    $mail->Username   = 'coolvibes1989@gmail.com';   //SMTP write your email
    $mail->Password   = 'jzflalrrwlfobuqd';      //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit SSL encryption
    $mail->Port       = 465;                                    
 
    //Recipients
    $mail->setFrom( $_POST["email"], $_POST["name"]); // Sender Email and name
    $mail->addAddress('coolvibes1989@gmail.com');     //Add a recipient email  
    $mail->addReplyTo($_POST["email"], $_POST["name"]); // reply to sender email
 
    //Content
    $mail->isHTML(true);               //Set email format to HTML
    $mail->Subject = $_POST["subject"];   // email subject headings
    $mail->Body    = $_POST["message"]; //email message
      
    // Success sent message alert
    $mail->send();
    echo
    " 
    <script> 
     alert('Message was sent successfully!');
     document.location.href = 'index.html';
    </script>
    ";
}
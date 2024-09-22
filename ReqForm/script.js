<script
  src="https://code.jquery.com/jquery-3.4.1.js"
  integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
  crossorigin="anonymous"></script>


function SubForm (){
    $.ajax({
        url:'https://api.apispreadsheets.com/data/7OySATKrFeiUEqMz/',
        type:'post',
        data:$("#myForm").serializeArray(),
        success: function(){
          alert("Form Submitted Successfully!")
        },
        error: function(){
          alert("Error: Form Not Submitted")
        }
    });
}
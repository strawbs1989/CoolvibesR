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

var formdata = false;
var dataUrl = "";
$(document).ready(function() {
    /*  $("#test_upload").click(function(e) {
         uploadfunction(e);
     }) */
    $("#uploadimage").on('submit', function(e) {
        e.preventDefault();
        uploadfunction();
    })
});

function uploadfunction() {
    /* e.preventDefault(); */
    /*  $("#message").empty();
     $('#loading').show(); */
    var originalImage = document.getElementById("get_photo");
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    formdata = false;
    newImage = new Image();

    if (window.FormData) {
        formdata = new FormData();
    }

    newImage.onload = function() {
        context.drawImage(newImage, 0, 0, 240, 240);
        dataUrl = canvas.toDataURL();
    }
    canvas = document.getElementById('canvas');
    var canvasToDURI = canvas.toDataURL();
    newImage.src = originalImage.src;
    var img = canvas.toDataURL("image/png");
    formdata.append("file", canvasToDURI);
}

function uploadToFunction() {
    setTimeout(function() {
        $.ajax({
            url: "php/test-image.php", // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            data: {
                imgBase64: dataUrl
            },
            timeout: 7000,
            error: function(jqXHR, textStatus, errorThrown) {
                showconnectionerror(textStatus);
            },
            success: function(data) { // A function to be called if request succeeds
                formSubmit(data);
            }
        });
    }, 500);






}


// Function to preview image after validation




function imageIsLoaded(e) {
    $("#file").css("color", "green");
    $('#image_preview').css("display", "block");
    $('#previewing').attr('src', e.target.result);
    $('#previewing').attr('width', '100px');

};
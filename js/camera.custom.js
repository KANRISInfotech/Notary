$(document).ready(function() {

    Webcam.set({
        // live preview size
        width: 320,
        height: 240,

        // device capture size
        dest_width: 320,
        dest_height: 240,

        // final cropped size
        crop_width: 240,
        crop_height: 240,

        // format and quality
        image_format: 'jpeg',
        jpeg_quality: 90,

        flip_horiz: true
    });

    Webcam.attach('#my_camera');
    $("#get_photo").click(function() {
        take_snapshot();
    })

})






function take_snapshot() {
    // take snapshot and get image data
    Webcam.snap(function(data_uri) {
        // display results in page
        $("#get_photo").attr('src', data_uri);
        uploadfunction();
    });
}
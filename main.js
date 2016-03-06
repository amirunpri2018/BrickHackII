$(document).ready(function () {

    var c = document.getElementById('photo');
    var v = document.getElementById('camera');
    var context = c.getContext('2d');
    
    // bad mix of vanilla and jquery. ooops
    $('#sendbutton').click(function(eObject){
        sendImage();
    })


    navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
    if (navigator.getUserMedia) {
        // Request access to video only
        navigator.getUserMedia(
            {
                video: true,
                audio: false
            },
            function (stream) {
                var url = window.URL || window.webkitURL;
                v.src = url ? url.createObjectURL(stream) : stream;
                v.play();
                var c = document.getElementById('photo');
                console.log(c);
                var context = c.getContext('2d');
                context.drawImage(v, 0, 0, c.width, c.height);

            },
            function (error) {
                alert('Something went wrong. (error code ' + error.code + ')');
                return;
            }
            );
    }
    else {
        alert('Sorry, the browser you are using doesn\'t support getUserMedia');
        return;
    }

    function sendImage() {
        
       
        $("#feedback").text("Getting emotional capability");
        console.log("send image");
        //var c = document.getElementById('photo');
        var url = c.toDataURL('image/jpeg');
         $("#photoimg").attr('src',url);
        console.log(url);

        $(function() {
            var params = {
                // Request parameters
                "returnFaceId": "true",
                "returnFaceLandmarks": "false"
               // "returnFaceAttributes": "{string}",
            };
          
            $.ajax({
                url: "https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params),
                beforeSend: function(xhrObj){
                    // Request headers
                    xhrObj.setRequestHeader("Content-Type","application/json");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","af044591052746449c1f6079be666c65");
                },
                type: "POST",
                // Request body
                data: '{"url":'url'}',
            })
            .done(function(data) {
                console.log(data);
                document.write(data);
                alert("succestaceyss");
            })
            .fail(function() {
                alert("error");
            });
        });
        // $.ajax({
        //     url: '/image',
        //     type: 'PUT',
        //     contentType: 'application/json',
        //     dataType: 'json',
        //     data: JSON.stringify({ data: url }),
        //     success: function (data) { 
        //         $("#feedback").text(JSON.stringify(data)) }
        // });
    }
    function showImage() {
        context.drawImage(v, 0, 0, c.width, c.height);
    }

    setInterval(showImage, 1);
});



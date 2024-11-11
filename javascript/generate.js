

// document.getElementById('downloadCertificate').addEventListener('click', function() {
//     var certificateImage = document.querySelector('.certificate');
//     var name = document.querySelector('input[name="name"]').value;
//     var course = document.querySelector('input[name="course"]').value;

//     // Create a temporary canvas to draw the certificate image and text
//     var canvas = document.createElement('canvas');
//     canvas.width = certificateImage.width;
//     canvas.height = certificateImage.height;
//     var ctx = canvas.getContext('2d');
//     ctx.drawImage(certificateImage, 0, 0);
//     ctx.font = '30px Arial';
//     ctx.fillStyle = 'white';
//     ctx.textAlign = 'center';
//     ctx.fillText(name, canvas.width / 2, 375); // Adjust Y position based on your image
//     ctx.fillText(course, canvas.width / 2, 510); // Adjust Y position based on your image

//     // Convert the canvas content to a data URL
//     var dataURL = canvas.toDataURL('image/png');

//     // Create a temporary link element to trigger the download
//     var link = document.createElement('a');
//     link.href = dataURL;
//     link.download = 'certificate.png';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// });


document.getElementById('downloadCertificate').addEventListener('click', function() {
    var certificateImage = document.querySelector('.certificate');
    var name = document.querySelector('input[name="name"]').value;
    var course = document.querySelector('input[name="course"]').value;

    var image = new Image();
    image.src = certificateImage.src;

    image.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';

        // Adjust Y position based on your image
        ctx.fillText(name, canvas.width / 2, 375);
        ctx.fillText(course, canvas.width / 2, 510);

        // Convert the canvas content to a data URL
        var dataURL = canvas.toDataURL('image/png');

        // Create a temporary link element to trigger the download
        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'certificate.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
});

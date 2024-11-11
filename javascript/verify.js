// document.addEventListener('DOMContentLoaded', function() {
//     const certificateUploadForm = document.getElementById('certificateUploadForm');
//     const certificateVerifyForm = document.getElementById('certificateVerifyForm');
//     const verificationResultDiv = document.getElementById('verificationResult');
  
//     // Certificate Upload Form Submission
//     certificateUploadForm.addEventListener('submit', function(event) {
//       event.preventDefault();
      
//       const certificateFile = document.getElementById('certificateFile').files[0];
      
//       // Check file was selected
//       if (!certificateFile) {
//         alert('Please choose a certificate file.');
//         return;
//       }
  
//       // Simulate certificate upload (replace with actual upload logic)
//       console.log('Uploading certificate:', certificateFile.name);
//       // Here, you would typically use XMLHttpRequest, fetch, or another method to upload the file to the server
//       // For demonstration, let's assume it was successful
//       alert('Certificate uploaded successfully!');
//       certificateUploadForm.reset();
//     });
  
//     // Certificate Verification Form Submission
//     certificateVerifyForm.addEventListener('submit', function(event) {
//       event.preventDefault();
  
//       const certificateId = document.getElementById('certificateId').value;
  
//       // Check if ID is empty
//       if (!certificateId) {
//         alert('Please enter a certificate ID.');
//         return;
//       }
  
//       // Simulate certificate verification (replace with actual verification logic)
//       console.log('Verifying certificate with ID:', certificateId);
//       // Here, you would send the ID to the server for verification
//       // For demonstration, let's assume the certificate is genuine
//       displayVerificationResult(true);
//     });
  
//     function displayVerificationResult(isGenuine) {
//       verificationResultDiv.innerText = isGenuine ? 'Certificate is Genuine!' : 'Certificate is Invalid or Tampered!';
//     }
//   });
  
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded");
    const signupForm = document.getElementById("signupForm");
    console.log(signupForm);

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = {
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value.trim(),
            confirmPassword: document.getElementById("confirmPassword").value.trim()
        };

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                alert(data.message);
                window.location.reload();
            } else {
                console.error('Empty response received');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        });
    });

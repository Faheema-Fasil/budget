document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginBtn").addEventListener("click", login);
    document.getElementById("registerBtn").addEventListener("click", register);
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUser = JSON.parse(localStorage.getItem(username));

    if (username === "" || password === "") {
        alert("Please enter both username and password.");
    } else if (storedUser && storedUser.password === password) {
        alert("Login successful!");
        window.location.href = './index.html'; // Correct the path if needed
    } else {
        alert("Invalid username or password.");
    }
}

// function register() {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     const email = document.getElementById('email').value;

//     if (username === "" || password === "" || email === "") {
//         alert("Please fill in all fields.");
//     } else if (!validateEmail(email)) {
//         alert("Please enter a valid email address.");
//     } else {
//         if (localStorage.getItem(username)) {
//             alert("Username already exists. Please choose a different one.");
//         } else {
//             localStorage.setItem(username, JSON.stringify({ password: password, email: email }));
//             alert("Registration successful!");
//             window.location.href = "login.html"; // Correct the path if needed
//         }
//     }
// }

// function validateEmail(email) {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
// }


// Attach event listener to the login button
// document.getElementById("loginBtn").addEventListener("click", login);

function register() {
    // Get the values of username, password, and email
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Simple validation
    if (username === "" || password === "" || email === "") {
        alert("Please fill in all fields.");
    } else if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
    } else {
        // Check if username already exists in localStorage
        if (localStorage.getItem('username')) {
            alert("Username already exists. Please choose a different one.");
        } else {
            // Store the user data in localStorage
            localStorage.setItem(username, JSON.stringify({ password: password, email: email,username:username }));

            alert("Registration successful!");

            // Redirect to login page after successful registration
            window.location.href = "login.html";
        }
    }
}
  // Function to validate email using regex
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Attach event listener to the register button
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const loginContainer = document.querySelector(".login-container");
    const registerContainer = document.querySelector(".register-container");

    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            alert("Login successful");
            window.location.href = "home.html";
        } else {
            alert("Login failed. Please check your credentials.");
        }
    });

    registerForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;

        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    });
  // Mostrar el formulario de inicio de sesión y ocultar el de registro por defecto
    loginContainer.style.display = "block";
    registerContainer.style.display = "none";
    
    const showLoginForm = () => {
        loginContainer.style.display = "block";
        registerContainer.style.display = "none";
    };

    const showRegisterForm = () => {
        loginContainer.style.display = "none";
        registerContainer.style.display = "block";
    };

    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");

    loginLink.addEventListener("click", showLoginForm);
    registerLink.addEventListener("click", showRegisterForm);

});

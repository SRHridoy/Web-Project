document
  .getElementById("adminLoginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    // Hardcoded credentials for demonstration
    if (email === "admin@gmail.com" && password === "admin123") {
      errorMessage.style.display = "none";
      localStorage.setItem("isAdminLoggedIn", "true"); // Set login flag
      window.location.href = "admin-panel.html"; // Redirect to admin panel
    } else {
      errorMessage.textContent = "Invalid email or password.";
      errorMessage.style.display = "block";
    }
  });

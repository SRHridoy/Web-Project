import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase config (Replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyAMi4k342i5RevH5UEF0hUoR68ptFFZ6x4",
  authDomain: "cse-club-of-hstu.firebaseapp.com",
  projectId: "cse-club-of-hstu",
  storageBucket: "cse-club-of-hstu.firebasestorage.app",
  messagingSenderId: "370944792306",
  appId: "1:370944792306:web:b9d45be7bc24a7ff34626b",
  measurementId: "G-36ETWRFX1M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Password Reset Function
window.resetPassword = function () {
  const emailInput = document.getElementById("email");
  const errorMessageDiv = document.getElementById("errorMessage");
  const successMessageDiv = document.getElementById("successMessage");

  if (!emailInput) {
    console.error("Email input element not found!");
    return;
  }

  const email = emailInput.value.trim();

  // Hide previous messages
  if (errorMessageDiv) errorMessageDiv.style.display = "none";
  if (successMessageDiv) successMessageDiv.style.display = "none";

  if (!email) {
    if (errorMessageDiv) {
      errorMessageDiv.textContent = "Please enter your email address.";
      errorMessageDiv.style.display = "block";
    }
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent!");
      if (successMessageDiv) {
        successMessageDiv.style.display = "block";
      }
      // Redirect to login page after successful email sent
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000); // Redirect after 2 seconds
    })
    .catch((error) => {
      console.error("Error sending password reset email:", error);
      if (errorMessageDiv) {
        errorMessageDiv.textContent = error.message;
        errorMessageDiv.style.display = "block";
      }
    });
};
function toggleMenu(){
  var menu = document.querySelector(".sidebar");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

document.addEventListener('click', function(event) {
  var sidebar = document.querySelector(".sidebar");
  var menuButton = document.querySelector(".menu-button");
  
  // Check if sidebar is currently open
  if (sidebar.style.display === "flex") {
    // Check if click is outside sidebar and not on menu button
    if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
      sidebar.style.display = "none";
    }
  }
});

// Close sidebar when pressing Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    var sidebar = document.querySelector(".sidebar");
    if (sidebar.style.display === "flex") {
      sidebar.style.display = "none";
    }
  }
});

// Login/Logout functionality
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  
  // Update navigation based on login status
  const loginLinks = document.querySelectorAll('a[href="login.html"]');
  const loginListItems = document.querySelectorAll('li:has(a[href="login.html"])');
  
  loginLinks.forEach(link => {
    const listItem = link.closest('li');
    if (isLoggedIn === "true" && userInfo.name) {
      // User is logged in - show profile option
      link.textContent = userInfo.name;
      link.href = "user.html";
      link.onclick = null;
      
      // Add user info tooltip
      link.title = `Logged in as ${userInfo.name}\nEmail: ${userInfo.email}\nClick to view profile`;
    } else {
      // User is not logged in - show login option
      link.textContent = "Login";
      link.href = "login.html";
      link.onclick = null;
      link.title = "Click to login";
    }
  });
}

function logout() {
  // Clear login data
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userInfo");
  
  // Show logout message
  alert("Successfully logged out!");
  
  // Update navigation
  checkLoginStatus();
  
  // If on login page, redirect to home
  if (window.location.pathname.includes('login.html')) {
    window.location.href = "index.html";
  }
}

// Initialize login status check when page loads
document.addEventListener("DOMContentLoaded", function () {
  checkLoginStatus();
  
  const slides = document.querySelectorAll(".slideshow img");
  let currentIndex = 0;

  function showNextSlide() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }

  setInterval(showNextSlide, 3000);
});

// Contact form handling
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
      
      // Show success message
      const formMsg = document.getElementById("formMsg");
      formMsg.textContent = "Thank you for your message! We'll get back to you soon.";
      formMsg.style.color = "#64ffda";
      
      // Clear form
      contactForm.reset();
      
      // Clear message after 5 seconds
      setTimeout(() => {
        formMsg.textContent = "";
      }, 5000);
    });
  }
});
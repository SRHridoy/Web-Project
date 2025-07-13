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

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slideshow img");
  let currentIndex = 0;

  function showNextSlide() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }

  setInterval(showNextSlide, 3000);
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slideshow img");
  let currentIndex = 0;

  function showNextSlide() {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }

  setInterval(showNextSlide, 3000);
});
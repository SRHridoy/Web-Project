function toggleMenu() {
	var menu = document.querySelector(".sidebar");
	menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

document.addEventListener("click", function (event) {
	var sidebar = document.querySelector(".sidebar");
	var menuButton = document.querySelector(".menu-button");

	// Check if sidebar is currently open
	if (sidebar.style.display === "flex") {
		// Check if click is outside sidebar and not on menu button
		if (
			!sidebar.contains(event.target) &&
			!menuButton.contains(event.target)
		) {
			sidebar.style.display = "none";
		}
	}
});

// Close sidebar when pressing Escape key
document.addEventListener("keydown", function (event) {
	if (event.key === "Escape") {
		var sidebar = document.querySelector(".sidebar");
		if (sidebar.style.display === "flex") {
			sidebar.style.display = "none";
		}
	}
});

// Initialize slideshow when page loads
document.addEventListener("DOMContentLoaded", function () {
	const slides = document.querySelectorAll(".slideshow img");
	let currentIndex = 0;

	function showNextSlide() {
		const currentSlides = document.querySelectorAll(".slideshow img"); // Re-query slides
		if (currentSlides.length === 0) {
			// No slides found, or they have been removed from the DOM
			// Clear the interval if it's set to prevent continuous errors
			return;
		}

		// Ensure currentIndex is within bounds of currentSlides
		if (currentIndex >= currentSlides.length) {
			currentIndex = 0; // Reset if out of bounds
		}

		// Remove 'active' from previous slide, if it exists
		if (currentSlides[currentIndex]) {
			currentSlides[currentIndex].classList.remove("active");
		}

		currentIndex = (currentIndex + 1) % currentSlides.length;

		// Add 'active' to new slide, if it exists
		if (currentSlides[currentIndex]) {
			currentSlides[currentIndex].classList.add("active");
		}
	}

	setInterval(showNextSlide, 3000);
});

// New function for login page password toggle
function toggleLoginPasswordVisibility() {
	const passwordInput = document.getElementById("password");
	const toggleCheckbox = document.getElementById("togglePassword");

	if (passwordInput && toggleCheckbox) {
		if (toggleCheckbox.checked) {
			passwordInput.type = "text";
		} else {
			passwordInput.type = "password";
		}
	}
}

function togglePassword(passwordInputId, toggleIconId) {
	const passwordInput = document.getElementById(passwordInputId);
	const toggleIcon = document.getElementById(toggleIconId);

	if (!passwordInput) {
		console.error("Password input not found:", passwordInputId);
		return;
	}

	if (passwordInput.type === "password") {
		passwordInput.type = "text";
		if (toggleIcon) {
			toggleIcon.classList.remove("fa-eye");
			toggleIcon.classList.add("fa-eye-slash");
		}
	} else {
		passwordInput.type = "password";
		if (toggleIcon) {
			toggleIcon.classList.remove("fa-eye-slash");
			toggleIcon.classList.add("fa-eye");
		}
	}
}

// Contact form handling
document.addEventListener("DOMContentLoaded", function () {
	const contactForm = document.getElementById("contactForm");
	if (contactForm) {
		contactForm.addEventListener("submit", function (e) {
			e.preventDefault();

			const formData = new FormData(contactForm);
			const name = formData.get("name");
			const email = formData.get("email");
			const message = formData.get("message");

			// Show success message
			const formMsg = document.getElementById("formMsg");
			formMsg.textContent =
				"Thank you for your message! We'll get back to you soon.";
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

// Load and display committee members
document.addEventListener("DOMContentLoaded", function () {
	const teamGrid = document.getElementById("teamGrid");
	if (teamGrid) {
		loadCommitteeMembers();
	}
});

async function loadCommitteeMembers() {
	try {
		const response = await fetch("data/committee-members.json");
		const data = await response.json();

		const teamGrid = document.getElementById("teamGrid");
		if (!teamGrid) return;

		// Clear existing content
		teamGrid.innerHTML = "";

		// Get the first 8 members (key positions) for homepage display
		const keyMembers = data.committeeMembers.slice(0, 8);

		keyMembers.forEach((member, index) => {
			const teamCard = document.createElement("div");
			teamCard.className = `team-card ${
				index >= 4 ? "hideOnMobile" : ""
			}`;

			// Use actual image path from JSON, fallback to default if not found
			const imagePath = member.image || "images/club_logo.jpg";

			teamCard.innerHTML = `
        <img src="${imagePath}" alt="${member.role}" class="team-photo" onerror="this.src='images/club_logo.jpg'" />
        <div class="team-name">${member.name}</div>
        <div class="team-role">${member.role}</div>
        <a href="#" class="team-linkedin" target="_blank" rel="noopener" title="LinkedIn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path d="M7.5 8.5C8.32843 8.5 9 7.82843 9 7C9 6.17157 8.32843 5.5 7.5 5.5C6.67157 5.5 6 6.17157 6 7C6 7.82843 6.67157 8.5 7.5 8.5Z" fill="white"/><rect x="6" y="10" width="3" height="8" rx="1.5" fill="white"/><path d="M12 10.5H14.5C16.1569 10.5 17.5 11.8431 17.5 13.5V18H15V13.5C15 13.2239 14.7761 13 14.5 13C14.2239 13 14 13.2239 14 13.5V18H12V10.5Z" fill="white"/></svg>
        </a>
      `;

			teamGrid.appendChild(teamCard);
		});

		// Add the "Committee Members..." link
		const memberBtn = document.createElement("h3");
	} catch (error) {
		console.error("Error loading committee members:", error);
		// Fallback to static content if JSON loading fails
		const teamGrid = document.getElementById("teamGrid");
		if (teamGrid) {
			teamGrid.innerHTML = `
        <div class="team-card">
          <img src="images/club_logo.jpg" alt="President" class="team-photo" />
          <div class="team-name">Adiba Mahjabin Nitu</div>
          <div class="team-role">President</div>
          <a href="#" class="team-linkedin" target="_blank" rel="noopener" title="LinkedIn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path d="M7.5 8.5C8.32843 8.5 9 7.82843 9 7C9 6.17157 8.32843 5.5 7.5 5.5C6.67157 5.5 6 6.17157 6 7C6 7.82843 6.67157 8.5 7.5 8.5Z" fill="white"/><rect x="6" y="10" width="3" height="8" rx="1.5" fill="white"/><path d="M12 10.5H14.5C16.1569 10.5 17.5 11.8431 17.5 13.5V18H15V13.5C15 13.2239 14.7761 13 14.5 13C14.2239 13 14 13.2239 14 13.5V18H12V10.5Z" fill="white"/></svg>
          </a>
        </div>
      `;
		}
	}
}

// Load and display testimonials
document.addEventListener("DOMContentLoaded", function () {
	const testimonialsGrid = document.getElementById("testimonialsGrid");
	if (testimonialsGrid) {
		loadTestimonials();
	}
});

async function loadTestimonials() {
	try {
		const response = await fetch("data/committee-members.json");
		const data = await response.json();
		const testimonialsGrid = document.getElementById("testimonialsGrid");
		if (!testimonialsGrid) return;
		testimonialsGrid.innerHTML = "";
		// Example testimonial texts
		const testimonialTexts = [
			"The CSE Club helped me discover my passion for coding and teamwork. Highly recommended for all students!",
			"Joining the club was the best decision of my university life. The events and workshops are top-notch.",
			"Great platform for networking and skill development. Proud to be a member of this amazing community.",
		];
		// Use first 3 key members for testimonials
		const keyMembers = data.committeeMembers.slice(0, 3);
		keyMembers.forEach((member, idx) => {
			const card = document.createElement("div");
			card.className = "testimonial-card";
			card.innerHTML = `
        <div class="testimonial-text">${testimonialTexts[idx]}</div>
        <div class="testimonial-author">— ${member.name}, ${member.role}</div>
      `;
			testimonialsGrid.appendChild(card);
		});
	} catch (error) {
		// fallback static testimonials
		const testimonialsGrid = document.getElementById("testimonialsGrid");
		if (testimonialsGrid) {
			testimonialsGrid.innerHTML = `
        <div class="testimonial-card">
          <div class="testimonial-text">The CSE Club helped me discover my passion for coding and teamwork. Highly recommended for all students!</div>
          <div class="testimonial-author">— Adiba Mahjabin Nitu, President</div>
        </div>
        <div class="testimonial-card">
          <div class="testimonial-text">Joining the club was the best decision of my university life. The events and workshops are top-notch.</div>
          <div class="testimonial-author">— Pankaj Bhowmik, Treasurer</div>
        </div>
        <div class="testimonial-card">
          <div class="testimonial-text">Great platform for networking and skill development. Proud to be a member of this amazing community.</div>
          <div class="testimonial-author">— Hamday Rabby Hossain (Auni), General Secretary</div>
        </div>
      `;
		}
	}
}

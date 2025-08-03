// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const db = getFirestore(app);

// Get references to HTML elements
const userListDiv = document.getElementById("user-list");
const yearSearchInput = document.getElementById("year-search-input");
const searchButton = document.getElementById("search-button");
const clearSearchButton = document.getElementById("clear-search-button");

let allUsers = []; // Store all users to enable efficient filtering

// Function to fetch and display all users
async function fetchAndDisplayUsers(filterYear = null) {
  userListDiv.innerHTML = "Loading users...";
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    if (querySnapshot.empty) {
      userListDiv.innerHTML = "<p>No users found.</p>";
      return;
    }

    allUsers = []; // Clear previous data
    querySnapshot.forEach((doc) => {
      allUsers.push({ id: doc.id, ...doc.data() });
    });

    renderUsers(filterYear); // Render users based on filter
  } catch (error) {
    console.error("Error fetching users:", error);
    userListDiv.innerHTML = "<p>Error loading users.</p>";
  }
}

// Function to render users based on a filter
function renderUsers(filterYear = null) {
  userListDiv.innerHTML = ""; // Clear loading message or previous content

  let filteredUsers = allUsers;
  if (filterYear) {
    filteredUsers = allUsers.filter((user) => {
      const studentId = user.studentId;
      if (studentId && studentId.length >= 4) {
        const admissionYear = "20" + studentId.substring(0, 2); // Assuming 20 for 21st century
        return admissionYear === filterYear;
      }
      return false;
    });
  }

  if (filteredUsers.length === 0) {
    userListDiv.innerHTML = "<p>No students found for this year.</p>";
    return;
  }

  filteredUsers.forEach((userData) => {
    const userCard = document.createElement("div");
    userCard.className = "member-card";
    let imageUrl =
      "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"; // Default placeholder

    if (userData.gender === "Male") {
      imageUrl =
        "https://img.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14044.jpg"; // Male avatar
    } else if (userData.gender === "Female") {
      imageUrl =
        "https://w7.pngwing.com/pngs/439/19/png-transparent-avatar-user-profile-icon-women-wear-frock-face-holidays-women-accessories-thumbnail.png"; // Female avatar
    }

    // Use profileImageUrl if available, overriding gender-based placeholders
    if (userData.profileImageUrl) {
      imageUrl = userData.profileImageUrl;
    }

    userCard.innerHTML = `
      <img src="${imageUrl}" alt="User Avatar" class="member-photo">
      <h3 class="member-name">${userData.name || "N/A"}</h3>
      <p class="member-info"><strong>Student ID:</strong> ${
        userData.studentId || "N/A"
      }</p>
      <p class="member-info"><strong>Department:</strong> ${
        userData.dept || "N/A"
      }</p>
      <p class="member-info"><strong>Contact:</strong> ${
        userData.contactNumber || "N/A"
      }</p>
      <p class="member-info"><strong>Email:</strong> ${
        userData.email || "N/A"
      }</p>
    `;
    userListDiv.appendChild(userCard);
  });
}

// Event Listeners for search and clear
searchButton.addEventListener("click", () => {
  const year = yearSearchInput.value.trim();
  if (year) {
    renderUsers(year);
  } else {
    renderUsers(); // Show all users if search input is empty
  }
});

clearSearchButton.addEventListener("click", () => {
  yearSearchInput.value = "";
  renderUsers(); // Show all users
});

// Auth State Change Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, fetch and display users
    fetchAndDisplayUsers();
  } else {
    // User is signed out, redirect to login page
    alert("You must be logged in to view this page.");
    window.location.href = "login.html";
  }
});

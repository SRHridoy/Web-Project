// Admin Panel JavaScript
let currentSection = "dashboard";
let usersData = [];
let eventsData = [];
let noticesData = [];

// Check admin access - Login requirement disabled
function checkAdminAccess() {
  if (localStorage.getItem("isAdminLoggedIn") !== "true") {
    window.location.href = "login.html"; // Redirect to admin login page
    return false;
  }
  // Set default admin info
  document.getElementById("adminName").textContent = "Admin User";
  document.getElementById("adminRole").textContent = "Administrator";

  return true;
}

// Show notification
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Show section
function showSection(sectionName) {
  // Hide all sections
  const sections = [
    "dashboard",
    "members",
    "events",
    "notices",
    "reports",
    "settings",
  ];
  sections.forEach((section) => {
    document.getElementById(section).style.display = "none";
  });

  // Show selected section
  document.getElementById(sectionName).style.display = "block";
  currentSection = sectionName;

  // Update page title
  const titles = {
    dashboard: "Dashboard",
    members: "Member Management",
    events: "Event Management",
    notices: "Notice Management",
    reports: "Reports & Analytics",
    settings: "Admin Settings",
  };
  document.getElementById("pageTitle").textContent = titles[sectionName];

  // Update active menu
  document.querySelectorAll(".sidebar-menu a").forEach((link) => {
    link.classList.remove("active");
  });
  event.target.classList.add("active");

  // Load section data
  loadSectionData(sectionName);
}

// Load section data
async function loadSectionData(section) {
  switch (section) {
    case "dashboard":
      loadDashboardData();
      break;
    case "members":
      loadMembersData();
      break;
    case "events":
      loadEventsData();
      break;
    case "notices":
      loadNoticesData();
      break;
  }
}

// Load dashboard data
async function loadDashboardData() {
  try {
    // Load users data
    const response = await fetch("../data/users.json");
    const data = await response.json();
    usersData = data.users;

    // Update dashboard numbers
    document.getElementById("totalMembers").textContent = usersData.length;
    document.getElementById("newRegistrations").textContent =
      Math.floor(Math.random() * 10) + 1;
    document.getElementById("upcomingEvents").textContent =
      Math.floor(Math.random() * 5) + 1;
    document.getElementById("activeNotices").textContent =
      Math.floor(Math.random() * 8) + 1;
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    showNotification("Error loading dashboard data", "error");
  }
}

// Load members data
async function loadMembersData() {
  try {
    const response = await fetch("../data/users.json");
    const data = await response.json();
    usersData = data.users;

    const tbody = document.getElementById("membersTableBody");
    tbody.innerHTML = "";

    usersData.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.studentId || "N/A"}</td>
        <td>${user.department || "N/A"}</td>
        <td>${user.role}</td>
        <td><span class="status-badge status-active">Active</span></td>
        <td>
          <button class="btn btn-primary" onclick="editMember(${user.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger" onclick="deleteMember(${user.id})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading members data:", error);
    showNotification("Error loading members data", "error");
  }
}

// Load events data
function loadEventsData() {
  // Demo events data
  eventsData = [
    {
      id: 1,
      name: "Python Programming Workshop",
      date: "2025-05-10",
      location: "CSE Lab 1, HSTU",
      type: "Workshop",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "AI in Everyday Life Seminar",
      date: "2025-05-20",
      location: "Auditorium, HSTU",
      type: "Seminar",
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Annual Coding Contest",
      date: "2025-06-05",
      location: "Online",
      type: "Contest",
      status: "Registration Open",
    },
  ];

  const tbody = document.getElementById("eventsTableBody");
  tbody.innerHTML = "";

  eventsData.forEach((event) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${event.name}</td>
      <td>${event.date}</td>
      <td>${event.location}</td>
      <td>${event.type}</td>
      <td><span class="status-badge status-pending">${event.status}</span></td>
      <td>
        <button class="btn btn-primary" onclick="editEvent(${event.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-danger" onclick="deleteEvent(${event.id})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Load notices data
function loadNoticesData() {
  // Demo notices data
  noticesData = [
    {
      id: 1,
      title: "Python Workshop Registration Open",
      datePosted: "2025-01-15",
      category: "Workshop",
      status: "Active",
    },
    {
      id: 2,
      title: "Annual General Meeting Notice",
      datePosted: "2025-01-10",
      category: "Meeting",
      status: "Active",
    },
    {
      id: 3,
      title: "Coding Contest Results",
      datePosted: "2025-01-05",
      category: "Results",
      status: "Active",
    },
  ];

  const tbody = document.getElementById("noticesTableBody");
  tbody.innerHTML = "";

  noticesData.forEach((notice) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${notice.title}</td>
      <td>${notice.datePosted}</td>
      <td>${notice.category}</td>
      <td><span class="status-badge status-active">${notice.status}</span></td>
      <td>
        <button class="btn btn-primary" onclick="editNotice(${notice.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-danger" onclick="deleteNotice(${notice.id})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Action functions
function addMember() {
  showNotification("Add Member functionality will be implemented", "warning");
}

function editMember(id) {
  const user = usersData.find((u) => u.id === id);
  if (user) {
    showNotification(
      `Edit functionality for ${user.name} will be implemented`,
      "warning"
    );
  }
}

function deleteMember(id) {
  const user = usersData.find((u) => u.id === id);
  if (user && confirm(`Are you sure you want to delete ${user.name}?`)) {
    usersData = usersData.filter((u) => u.id !== id);
    loadMembersData();
    showNotification(`${user.name} deleted successfully`, "success");
  }
}

function addEvent() {
  showNotification("Add Event functionality will be implemented", "warning");
}

function editEvent(id) {
  const event = eventsData.find((e) => e.id === id);
  if (event) {
    showNotification(
      `Edit functionality for "${event.name}" will be implemented`,
      "warning"
    );
  }
}

function deleteEvent(id) {
  const event = eventsData.find((e) => e.id === id);
  if (event && confirm(`Are you sure you want to delete "${event.name}"?`)) {
    eventsData = eventsData.filter((e) => e.id !== id);
    loadEventsData();
    showNotification(`Event "${event.name}" deleted successfully`, "success");
  }
}

function addNotice() {
  showNotification("Add Notice functionality will be implemented", "warning");
}

function editNotice(id) {
  const notice = noticesData.find((n) => n.id === id);
  if (notice) {
    showNotification(
      `Edit functionality for "${notice.title}" will be implemented`,
      "warning"
    );
  }
}

function deleteNotice(id) {
  const notice = noticesData.find((n) => n.id === id);
  if (notice && confirm(`Are you sure you want to delete "${notice.title}"?`)) {
    noticesData = noticesData.filter((n) => n.id !== id);
    loadNoticesData();
    showNotification(
      `Notice "${notice.title}" deleted successfully`,
      "success"
    );
  }
}

function exportMembers() {
  showNotification("Exporting members list...", "success");
  // Implementation for export functionality
}

function exportEvents() {
  showNotification("Exporting events report...", "success");
  // Implementation for export functionality
}

function editProfile() {
  showNotification("Edit profile functionality will be implemented", "warning");
}

function changePassword() {
  showNotification(
    "Change password functionality will be implemented",
    "warning"
  );
}

function logout() {
  localStorage.removeItem("isAdminLoggedIn"); // Clear login flag
  showNotification("Logged out successfully", "success");
  setTimeout(() => {
    window.location.href = "login.html"; // Redirect to admin login page
  }, 1500);
}

// Initialize admin panel
document.addEventListener("DOMContentLoaded", function () {
  checkAdminAccess(); // Ensure admin is logged in
  loadDashboardData();
});

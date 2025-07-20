// Event Management JavaScript
let eventsData = [];
let currentView = 'table';

// Check admin access - Login requirement disabled
function checkAdminAccess() {
  // Login requirement removed - allow direct access
  return true;
}

// Show notification
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.add("show");
  setTimeout(() => { notification.classList.remove("show"); }, 3000);
}

// Load events data (demo)
function loadEventsData() {
  eventsData = [
    { id: 1, name: "Python Programming Workshop", date: "2025-05-10", location: "CSE Lab 1, HSTU", type: "Workshop", status: "Upcoming" },
    { id: 2, name: "AI in Everyday Life Seminar", date: "2025-05-20", location: "Auditorium, HSTU", type: "Seminar", status: "Upcoming" },
    { id: 3, name: "Annual Coding Contest", date: "2025-06-05", location: "Online", type: "Contest", status: "Registration Open" }
  ];
  displayEvents(eventsData);
}

// Display events
function displayEvents(events) {
  const tableBody = document.getElementById("eventsTableBody");
  const gridContainer = document.getElementById("eventsGrid");
  if (currentView === 'table') {
    tableBody.innerHTML = '';
    document.getElementById('eventsTable').style.display = '';
    document.getElementById('eventsGrid').style.display = 'none';
    events.forEach(event => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${event.name}</td>
        <td>${event.date}</td>
        <td>${event.location}</td>
        <td>${event.type}</td>
        <td><span class="status-badge status-upcoming">${event.status}</span></td>
        <td>
          <button class="btn btn-primary btn-small" onclick="editEvent(${event.id})"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-small" onclick="deleteEvent(${event.id})"><i class="fas fa-trash"></i></button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } else {
    gridContainer.innerHTML = '';
    document.getElementById('eventsTable').style.display = 'none';
    document.getElementById('eventsGrid').style.display = '';
    events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
        <div class="event-title">${event.name}</div>
        <div class="event-details">
          <div class="event-detail"><span>Date:</span><span>${event.date}</span></div>
          <div class="event-detail"><span>Location:</span><span>${event.location}</span></div>
          <div class="event-detail"><span>Type:</span><span>${event.type}</span></div>
          <div class="event-detail"><span>Status:</span><span class="status-badge status-upcoming">${event.status}</span></div>
        </div>
        <div class="event-actions">
          <button class="btn btn-primary btn-small" onclick="editEvent(${event.id})"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-small" onclick="deleteEvent(${event.id})"><i class="fas fa-trash"></i></button>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  }
}

// View toggle
function setView(view) {
  currentView = view;
  displayEvents(eventsData);
  document.getElementById('tableViewBtn').classList.toggle('active', view === 'table');
  document.getElementById('gridViewBtn').classList.toggle('active', view === 'grid');
}

document.getElementById('tableViewBtn').addEventListener('click', () => setView('table'));
document.getElementById('gridViewBtn').addEventListener('click', () => setView('grid'));

// Search
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = eventsData.filter(event =>
    event.name.toLowerCase().includes(searchTerm) ||
    event.location.toLowerCase().includes(searchTerm) ||
    event.type.toLowerCase().includes(searchTerm)
  );
  displayEvents(filtered);
});

// Add event form
const addEventForm = document.getElementById('addEventForm');
addEventForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(addEventForm);
  const eventData = {
    id: eventsData.length + 1,
    name: formData.get('name'),
    date: formData.get('date'),
    location: formData.get('location'),
    type: formData.get('type'),
    status: formData.get('status') || 'Upcoming'
  };
  eventsData.push(eventData);
  displayEvents(eventsData);
  showNotification('Event added successfully!', 'success');
  addEventForm.reset();
});

// Edit event
function editEvent(id) {
  const event = eventsData.find(e => e.id === id);
  if (event) {
    showNotification(`Edit functionality for "${event.name}" will be implemented`, "warning");
  }
}

// Delete event
function deleteEvent(id) {
  const event = eventsData.find(e => e.id === id);
  if (event && confirm(`Are you sure you want to delete "${event.name}"?`)) {
    eventsData = eventsData.filter(e => e.id !== id);
    displayEvents(eventsData);
    showNotification(`Event "${event.name}" deleted successfully`, "success");
  }
}

// Export events
function exportEvents() {
  const csvContent = "data:text/csv;charset=utf-8," +
    "Name,Date,Location,Type,Status\n" +
    eventsData.map(event => `${event.name},${event.date},${event.location},${event.type},${event.status}`).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "events_list.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showNotification("Events list exported successfully", "success");
}

// Initialize
document.addEventListener("DOMContentLoaded", function() {
  // Login requirement removed - always load data
  loadEventsData();
  setView('table');
}); 
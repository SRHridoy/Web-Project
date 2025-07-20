// Notice Management JavaScript
let noticesData = [];

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

// Load notices data (demo)
function loadNoticesData() {
  noticesData = [
    { id: 1, title: "Python Workshop Registration Open", datePosted: "2025-01-15", category: "Workshop", status: "Active" },
    { id: 2, title: "Annual General Meeting Notice", datePosted: "2025-01-10", category: "Meeting", status: "Active" },
    { id: 3, title: "Coding Contest Results", datePosted: "2025-01-05", category: "Results", status: "Active" }
  ];
  displayNotices(noticesData);
}

// Display notices
function displayNotices(notices) {
  const tbody = document.getElementById("noticesTableBody");
  tbody.innerHTML = '';
  notices.forEach(notice => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${notice.title}</td>
      <td>${notice.datePosted}</td>
      <td>${notice.category}</td>
      <td><span class="status-badge status-active">${notice.status}</span></td>
      <td>
        <button class="btn btn-primary btn-small" onclick="editNotice(${notice.id})"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-small" onclick="deleteNotice(${notice.id})"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Search
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = noticesData.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm) ||
    notice.category.toLowerCase().includes(searchTerm)
  );
  displayNotices(filtered);
});

// Add notice form
const addNoticeForm = document.getElementById('addNoticeForm');
addNoticeForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(addNoticeForm);
  const noticeData = {
    id: noticesData.length + 1,
    title: formData.get('title'),
    datePosted: formData.get('datePosted'),
    category: formData.get('category'),
    status: formData.get('status') || 'Active'
  };
  noticesData.push(noticeData);
  displayNotices(noticesData);
  showNotification('Notice added successfully!', 'success');
  addNoticeForm.reset();
});

// Edit notice
function editNotice(id) {
  const notice = noticesData.find(n => n.id === id);
  if (notice) {
    showNotification(`Edit functionality for "${notice.title}" will be implemented`, "warning");
  }
}

// Delete notice
function deleteNotice(id) {
  const notice = noticesData.find(n => n.id === id);
  if (notice && confirm(`Are you sure you want to delete "${notice.title}"?`)) {
    noticesData = noticesData.filter(n => n.id !== id);
    displayNotices(noticesData);
    showNotification(`Notice "${notice.title}" deleted successfully`, "success");
  }
}

// Export notices
function exportNotices() {
  const csvContent = "data:text/csv;charset=utf-8," +
    "Title,Date Posted,Category,Status\n" +
    noticesData.map(notice => `${notice.title},${notice.datePosted},${notice.category},${notice.status}`).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "notices_list.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showNotification("Notices list exported successfully", "success");
}

// Initialize
document.addEventListener("DOMContentLoaded", function() {
  if (checkAdminAccess()) {
    loadNoticesData();
  }
}); 
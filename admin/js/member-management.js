// Member Management JavaScript
let usersData = [];

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
  
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Load members data
async function loadMembersData() {
  try {
    const response = await fetch('../data/users.json');
    const data = await response.json();
    usersData = data.users;
    
    displayMembers(usersData);
    
  } catch (error) {
    console.error('Error loading members data:', error);
    showNotification("Error loading members data", "error");
  }
}

// Display members in table
function displayMembers(members) {
  const tbody = document.getElementById("membersTableBody");
  tbody.innerHTML = '';
  
  members.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.studentId || 'N/A'}</td>
      <td>${user.department || 'N/A'}</td>
      <td>${user.year || 'N/A'}</td>
      <td>${user.role}</td>
      <td><span class="status-badge status-active">Active</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-primary btn-small" onclick="editMember(${user.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-warning btn-small" onclick="toggleMemberStatus(${user.id})">
            <i class="fas fa-ban"></i>
          </button>
          <button class="btn btn-danger btn-small" onclick="deleteMember(${user.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredMembers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    user.studentId.toLowerCase().includes(searchTerm) ||
    user.department.toLowerCase().includes(searchTerm)
  );
  displayMembers(filteredMembers);
});

// Add member form handling
document.getElementById("addMemberForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const memberData = {
    id: usersData.length + 1,
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    phone: formData.get('phone'),
    studentId: formData.get('studentId'),
    department: formData.get('department'),
    year: formData.get('year'),
    role: formData.get('role'),
    bio: formData.get('bio'),
    interests: formData.get('interests').split(',').map(item => item.trim()).filter(item => item),
    skills: formData.get('skills').split(',').map(item => item.trim()).filter(item => item),
    joinDate: new Date().toISOString().split('T')[0],
    avatar: "../images/default-avatar.jpg",
    isActive: true
  };
  
  // Add to users array
  usersData.push(memberData);
  
  // Update display
  displayMembers(usersData);
  
  // Show success message
  showNotification("Member added successfully!", "success");
  
  // Reset form
  e.target.reset();
});

// Edit member
function editMember(id) {
  const user = usersData.find(u => u.id === id);
  if (user) {
    showNotification(`Edit functionality for ${user.name} will be implemented`, "warning");
  }
}

// Toggle member status
function toggleMemberStatus(id) {
  const user = usersData.find(u => u.id === id);
  if (user) {
    user.isActive = !user.isActive;
    displayMembers(usersData);
    showNotification(`${user.name} status updated`, "success");
  }
}

// Delete member
function deleteMember(id) {
  const user = usersData.find(u => u.id === id);
  if (user && confirm(`Are you sure you want to delete ${user.name}?`)) {
    usersData = usersData.filter(u => u.id !== id);
    displayMembers(usersData);
    showNotification(`${user.name} deleted successfully`, "success");
  }
}

// Export members
function exportMembers() {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Name,Email,Student ID,Department,Year,Role,Join Date\n"
    + usersData.map(user => 
      `${user.name},${user.email},${user.studentId || ''},${user.department || ''},${user.year || ''},${user.role},${user.joinDate || ''}`
    ).join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "members_list.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showNotification("Members list exported successfully", "success");
}

// Initialize
document.addEventListener("DOMContentLoaded", function() {
  // Login requirement removed - always load data
  loadMembersData();
}); 
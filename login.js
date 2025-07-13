// Login/Logout functionality
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  
  // Update navigation based on login status
  const loginLinks = document.querySelectorAll('a[href="login.html"]');
  const becomeMemberLinks = document.querySelectorAll('a[href="become-member.html"]');
  
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
  
  // Hide/Show "Become a Member" based on login status
  becomeMemberLinks.forEach(link => {
    const listItem = link.closest('li');
    if (isLoggedIn === "true" && userInfo.name) {
      // User is logged in - hide "Become a Member"
      if (listItem) {
        listItem.style.display = 'none';
      }
    } else {
      // User is not logged in - show "Become a Member"
      if (listItem) {
        listItem.style.display = '';
      }
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

// Password toggle function for login forms
function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const icon = input.parentElement.querySelector('.password-toggle');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// User data management
let usersData = [];

// Load users data from JSON file
async function loadUsersData() {
  try {
    const response = await fetch('data/users.json');
    const data = await response.json();
    usersData = data.users;
  } catch (error) {
    console.error('Error loading users data:', error);
    // Fallback to default users if JSON fails to load
    usersData = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        studentId: "2002001",
        phone: "01712345678",
        department: "CSE",
        year: "3rd Year",
        role: "General Member",
        joinDate: "2023-01-15",
        interests: ["Web Development", "Machine Learning", "Competitive Programming"],
        skills: ["JavaScript", "Python", "React", "Node.js"],
        bio: "Passionate about technology and always eager to learn new things.",
        avatar: "images/default-avatar.jpg",
        isActive: true
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        studentId: "2002002",
        phone: "01787654321",
        department: "CSE",
        year: "2nd Year",
        role: "General Member",
        joinDate: "2023-02-20",
        interests: ["UI/UX Design", "Mobile Development", "Data Science"],
        skills: ["Figma", "Flutter", "SQL", "Java"],
        bio: "Creative designer with a passion for user experience.",
        avatar: "images/default-avatar.jpg",
        isActive: true
      },
      {
        id: 3,
        name: "Admin User",
        email: "admin@cseclub.com",
        password: "admin123",
        studentId: "2002000",
        phone: "01700000000",
        department: "CSE",
        year: "4th Year",
        role: "Admin",
        joinDate: "2022-12-01",
        interests: ["System Administration", "Network Security", "Database Management"],
        skills: ["Linux", "Docker", "MySQL", "Cybersecurity"],
        bio: "System administrator with expertise in network security and database management.",
        avatar: "images/default-avatar.jpg",
        isActive: true
      }
    ];
  }
}

// Login form handling
async function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Simple validation
  if (!email || !password) {
    showMessage('Please fill in all fields', 'error');
    return;
  }
  
  // Simulate login process
  const loginButton = document.querySelector('button[type="submit"]');
  const originalText = loginButton.textContent;
  loginButton.textContent = 'Logging in...';
  loginButton.disabled = true;
  
  try {
    // Find user in the data
    const user = usersData.find(u => u.email === email && u.password === password && u.isActive);
    
    if (user) {
      // Remove password from user info before storing
      const { password, ...userInfo } = user;
      
      // Debug: Log the user info being stored
      console.log("Storing user info:", userInfo);
      
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      
      showMessage('Login successful! Redirecting...', 'success');
      
      // Redirect to user profile after 1.5 seconds
      setTimeout(() => {
        window.location.href = 'user.html';
      }, 1500);
    } else {
      showMessage('Invalid email or password!', 'error');
    }
  } catch (error) {
    showMessage('Login failed. Please try again.', 'error');
  }
  
  loginButton.textContent = originalText;
  loginButton.disabled = false;
}

// User registration handling
async function handleRegistration(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const userData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    phone: formData.get('phone'),
    studentId: formData.get('studentId'),
    department: formData.get('department'),
    year: formData.get('year')
  };
  
  // Get confirm password
  const confirmPassword = formData.get('confirmPassword');
  
  // Validation
  if (!userData.name || !userData.email || !userData.password) {
    showMessage('Please fill in all required fields', 'error');
    return;
  }
  
  // Validate passwords match
  if (userData.password !== confirmPassword) {
    showMessage('Passwords do not match!', 'error');
    return;
  }
  
  // Validate password strength
  if (userData.password.length < 8) {
    showMessage('Password must be at least 8 characters long!', 'error');
    return;
  }
  
  // Check if user already exists
  const existingUser = usersData.find(u => u.email === userData.email);
  if (existingUser) {
    showMessage('User with this email already exists!', 'error');
    return;
  }
  
  // Create new user
  const newUser = {
    id: usersData.length + 1,
    ...userData,
    role: "General Member",
    joinDate: new Date().toISOString().split('T')[0],
    interests: [],
    skills: [],
    bio: "",
    avatar: "images/default-avatar.jpg",
    isActive: true
  };
  
  // Add to users array
  usersData.push(newUser);
  
  // Save to JSON file (simulate server save)
  await saveUserToJSON(newUser);
  
  // Show success message
  const successMessage = document.getElementById('successMessage');
  if (successMessage) {
    successMessage.textContent = 'Registration successful! New user added to JSON file.';
    successMessage.style.display = 'block';
  }
  
  // Clear form
  event.target.reset();
  
  // Reset password strength bar
  const strengthBar = document.getElementById('passwordStrength');
  if (strengthBar) {
    strengthBar.className = 'password-strength-bar';
  }
  
  // Don't redirect immediately, let user see the download option
  // setTimeout(() => {
  //   window.location.href = 'login.html';
  // }, 2000);
}

// Save new user to JSON file
async function saveUserToJSON(newUser) {
  try {
    // Load current JSON data
    const response = await fetch('data/users.json');
    const data = await response.json();
    
    // Add new user
    data.users.push(newUser);
    
    // In a real application, you would send this to the server
    // For now, we'll simulate saving by updating localStorage
    localStorage.setItem('newUserData', JSON.stringify(newUser));
    
    // Show success message with user details
    console.log('New user added:', newUser);
    
    // You can also show a download link for the updated JSON
    showDownloadLink(data);
    
  } catch (error) {
    console.error('Error saving user data:', error);
    // Fallback: just store in localStorage
    localStorage.setItem('newUserData', JSON.stringify(newUser));
  }
}

// Show download link for updated JSON
function showDownloadLink(data) {
  const downloadDiv = document.getElementById('downloadSection');
  if (downloadDiv) {
    downloadDiv.innerHTML = `
      <div class="download-info">
        <h4>Registration Successful!</h4>
        <p>New user has been added to the system.</p>
        <button onclick="downloadUpdatedJSON()" class="download-btn">
          Download Updated Users JSON
        </button>
      </div>
    `;
    downloadDiv.style.display = 'block';
  }
}

// Download updated JSON file
function downloadUpdatedJSON() {
  try {
    // Get current users data
    const currentData = {
      users: [...usersData]
    };
    
    // Create blob and download
    const blob = new Blob([JSON.stringify(currentData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users_updated.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('JSON file downloaded successfully!', 'success');
  } catch (error) {
    console.error('Error downloading JSON:', error);
    showMessage('Error downloading file', 'error');
  }
}

// Get user by ID
function getUserById(userId) {
  return usersData.find(user => user.id === userId);
}

// Update user data
function updateUserData(userId, updatedData) {
  const userIndex = usersData.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    usersData[userIndex] = { ...usersData[userIndex], ...updatedData };
    return true;
  }
  return false;
}

// Show message function
function showMessage(message, type) {
  // Try to find message div in current page
  let messageDiv = document.getElementById('message');
  
  // If not found, try error/success message divs
  if (!messageDiv) {
    messageDiv = document.getElementById('errorMessage') || document.getElementById('successMessage');
  }
  
  if (messageDiv) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}-message`;
    messageDiv.style.display = 'block';
    
    // Hide message after 3 seconds
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 3000);
  } else {
    // Fallback: use alert
    alert(message);
  }
}

// Initialize login functionality when page loads
document.addEventListener("DOMContentLoaded", async function () {
  // Load users data first
  await loadUsersData();
  
  // Then check login status
  checkLoginStatus();
  
  // Add login form handler if on login page
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Add registration form handler if on registration page
  const registrationForm = document.getElementById('registrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', handleRegistration);
  }
}); 
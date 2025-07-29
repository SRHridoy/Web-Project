window.updateUI = (user) => {
  const profileSection = document.getElementById("profile-section");
  const userEmailSpan = document.getElementById("user-email");
  const profileStudentIdSpan = document.getElementById("profile-student-id");
  const profileNameSpan = document.getElementById("profile-name");
  const profileDeptSpan = document.getElementById("profile-dept");
  const profileContactNumberSpan = document.getElementById(
    "profile-contact-number"
  );
  const profileYearSpan = document.getElementById("profile-year");

  const navLoginLink = document.getElementById("navLoginLink");
  const sidebarLoginLink = document.getElementById("sidebarLoginLink");

  console.log("updateUI called with user:", user);
  console.log("navLoginLink found:", !!navLoginLink);
  console.log("sidebarLoginLink found:", !!sidebarLoginLink);
  console.log("profileSection found:", !!profileSection);

  if (user) {
    if (profileSection) {
      profileSection.style.display = "block";
    }
    if (userEmailSpan) userEmailSpan.textContent = user.email;
    if (profileStudentIdSpan)
      profileStudentIdSpan.textContent = user.studentId || "";
    if (profileNameSpan) profileNameSpan.textContent = user.name || "";
    if (profileDeptSpan) profileDeptSpan.textContent = user.dept || "";
    if (profileContactNumberSpan)
      profileContactNumberSpan.textContent = user.contactNumber || "";
    if (profileYearSpan) profileYearSpan.textContent = user.year || "";

    if (navLoginLink) {
      navLoginLink.textContent = user.name || user.email;
      navLoginLink.href = "user.html";
    }
    if (sidebarLoginLink) {
      sidebarLoginLink.textContent = user.name || user.email;
      sidebarLoginLink.href = "user.html";
    }
  } else {
    if (profileSection) {
      profileSection.style.display = "none";
    }
    if (userEmailSpan) userEmailSpan.textContent = "";
    if (profileStudentIdSpan) profileStudentIdSpan.textContent = "";
    if (profileNameSpan) profileNameSpan.textContent = "";
    if (profileDeptSpan) profileDeptSpan.textContent = "";
    if (profileContactNumberSpan) profileContactNumberSpan.textContent = "";
    if (profileYearSpan) profileYearSpan.textContent = "";

    if (navLoginLink) {
      navLoginLink.textContent = "Login";
      navLoginLink.href = "login.html";
    }
    if (sidebarLoginLink) {
      sidebarLoginLink.textContent = "Login";
      sidebarLoginLink.href = "login.html";
    }
  }
};

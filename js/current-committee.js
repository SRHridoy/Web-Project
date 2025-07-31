// Import Firebase Modules (if needed, though likely not directly for committee display)
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
  const committeeGrid = document.getElementById("committeeGrid");
  if (committeeGrid) {
    loadAllCommitteeMembers();
  }
});

async function loadAllCommitteeMembers() {
  const committeeGrid = document.getElementById("committeeGrid");
  if (!committeeGrid) return;

  committeeGrid.innerHTML = "Loading committee members..."; // Loading message

  try {
    const response = await fetch("data/committee-members.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    committeeGrid.innerHTML = ""; // Clear loading message

    if (data.committeeMembers && data.committeeMembers.length > 0) {
      data.committeeMembers.forEach((member) => {
        const memberCard = document.createElement("div");
        memberCard.className = "team-card"; // Use existing team-card style

        // Use actual image path from JSON, fallback to default if not found
        const imagePath = member.image || "images/club_logo.jpg";

        memberCard.innerHTML = `
          <img src="${imagePath}" alt="${
          member.name
        }" class="team-photo" onerror="this.src='images/club_logo.jpg'" />
          <div class="team-name">${member.name || "N/A"}</div>
          <div class="team-role">${member.role || "N/A"}</div>
          <div class="member-contact">Contact: ${member.phone || "N/A"}</div>
        `;
        committeeGrid.appendChild(memberCard);
      });
    } else {
      committeeGrid.innerHTML = "<p>No committee members found.</p>";
    }
  } catch (error) {
    console.error("Error loading committee members:", error);
    committeeGrid.innerHTML = "<p>Error loading committee members.</p>";
  }
}

document.addEventListener("DOMContentLoaded", function () {
	loadCommitteeMembers();
});

async function loadCommitteeMembers() {
	const committeeGrid = document.getElementById("committeeGrid");
	if (!committeeGrid) {
		console.error("committeeGrid element not found in the DOM.");
		return;
	}
	try {
		const response = await fetch("get_current_committee.php");
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const committeeMembers = await response.json();

		// Defensive: check if the response is actually an array
		if (!Array.isArray(committeeMembers) || committeeMembers.length === 0) {
			committeeGrid.innerHTML =
				'<p style="text-align: center; color: #64ffda;">No committee members found.</p>';
			return;
		}

		committeeGrid.innerHTML = ""; // Clear previous data

		committeeMembers.forEach((member) => {
			const memberCard = createMemberCard(member);
			committeeGrid.appendChild(memberCard);
		});
	} catch (error) {
		console.error("Error loading committee members:", error);
		committeeGrid.innerHTML = `
			<p style="text-align: center; color: #ff6b6b;">
				Failed to load committee members.
			</p>
			<p style="text-align: center; color: #ff6b6b; font-size: 0.8em;">
				<strong>Error:</strong> ${error.message}
			</p>
			<p style="text-align: center; color: #aaa; font-size: 0.8em;">
				Please check the browser console (F12) for more details.
			</p>`;
	}
}

function createMemberCard(member) {
	const card = document.createElement("div");
	card.className = "team-card";

	// Fix image path logic: if image is present, use as is or prepend "images/" if not absolute
	let imageUrl = "";
	if (member.image && typeof member.image === "string" && member.image.trim() !== "") {
		if (member.image.startsWith("http") || member.image.startsWith("/")) {
			imageUrl = member.image;
		} else {
			imageUrl = "images/" + member.image;
		}
	}

	card.innerHTML = `
		${imageUrl ? `<img src="${imageUrl}" alt="${member.name ? member.name : ""}" class="member-image">` : ''}
		<div class="member-info">
			<div class="member-name">${member.name ? member.name : ""}</div>
			<div class="member-role">${member.position ? member.position : ""}</div>
			<p>${member.description ? member.description : ""}</p>
			${member.contact ? `<div class="member-contact">${member.contact}</div>` : ""}
		</div>
	`;

	return card;
}

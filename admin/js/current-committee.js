document.addEventListener('DOMContentLoaded', () => {
    const committeeForm = document.getElementById('addCommitteeForm');
    const committeeList = document.getElementById('committeeTableBody');

    // Toast function
    function showToast(message, type = "success") {
        let prev = document.getElementById("toast-msg");
        if (prev) prev.remove();

        const toast = document.createElement("div");
        toast.id = "toast-msg";
        toast.innerText = message;
        toast.style.position = "fixed";
        toast.style.top = "30px";
        toast.style.right = "30px";
        toast.style.padding = "16px 32px";
        toast.style.background = type === "success" ? "#27ae60" : "#c0392b";
        toast.style.color = "#fff";
        toast.style.fontSize = "1.1em";
        toast.style.borderRadius = "10px";
        toast.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)";
        toast.style.zIndex = "10000";
        toast.style.opacity = "0.97";
        toast.style.fontWeight = "600";
        toast.style.transition = "all .4s";
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 500);
        }, 2300);
    }

    // Fetch and display committee members
    async function fetchCommittee() {
        try {
            const response = await fetch('get_committee.php');
            const committee = await response.json();

            committeeList.innerHTML = '';

            committee.forEach(member => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${member.name}</td>
                    <td>${member.position}</td>
                    <td>${member.description}</td>
                    <td>${member.contact}</td>
                    <td>
                        <button class="delete-btn" data-id="${member.id}">Delete</button>
                    </td>
                `;
                committeeList.appendChild(row);
            });
        } catch (error) {
            showToast('Error loading committee members!', "error");
        }
    }

    // Handle form submission
    committeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(committeeForm);
        try {
            const response = await fetch('save_committee.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.text();
            if (result.toLowerCase().includes("success")) {
                showToast("✔️ Committee member added!", "success");
                committeeForm.reset();
                fetchCommittee(); // Refresh the list
            } else {
                showToast(result, "error");
            }
        } catch (error) {
            showToast('❌ Error saving member!', "error");
        }
    });

    // Handle delete button clicks
    committeeList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            if (confirm('Are you sure you want to delete this member?')) {
                try {
                    const response = await fetch('delete_committee.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `id=${id}`
                    });
                    const result = await response.text();
                    if (result.toLowerCase().includes("success")) {
                        showToast("🗑️ Member deleted!", "success");
                        fetchCommittee();
                    } else {
                        showToast(result, "error");
                    }
                } catch (error) {
                    showToast('❌ Error deleting member!', "error");
                }
            }
        }
    });

    fetchCommittee();
});

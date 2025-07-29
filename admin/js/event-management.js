document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("addEventForm");
	if (!form) {
		console.warn("Form with id 'addEventForm' not found!");
		return;
	}
	form.addEventListener("submit", function (e) {
		e.preventDefault();

		const formData = new FormData(form);

		fetch("save_event.php", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.text())
			.then((msg) => {
				if (msg.toLowerCase().includes("success")) {
					showToast("✔️ Event saved successfully!", "success");
					form.reset();
				} else {
					showToast("❌ " + msg, "error");
				}
			})
			.catch(() => {
				showToast("❌ Something went wrong!", "error");
			});
	});
});

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
	}, 5000);
}

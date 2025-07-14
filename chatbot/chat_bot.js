const apiKey = "YOUR_GEMINI_API_KEY"; // এখানে আপনার জেমিনি API key বসান

// Chatbot UI Elements
let chatlog;
let userInput;
let sendButton;
let chatbotWindow;
let chatbotToggle;
let typingIndicator;

// Initialize chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
	initializeChatbot();
});

function initializeChatbot() {
	// Create chatbot HTML structure
	createChatbotHTML();

	// Get references to elements
	chatlog = document.getElementById("chatbot-messages");
	userInput = document.getElementById("chatbot-input");
	sendButton = document.getElementById("chatbot-send");
	chatbotWindow = document.getElementById("chatbot-window");
	chatbotToggle = document.getElementById("chatbot-toggle");
	typingIndicator = document.getElementById("typing-indicator");

	// Add event listeners
	chatbotToggle.addEventListener("click", toggleChatbot);
	document
		.getElementById("chatbot-close")
		.addEventListener("click", toggleChatbot);
	sendButton.addEventListener("click", sendMessage);
	userInput.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			sendMessage();
		}
	});

	// Add welcome message
	addWelcomeMessage();

	// Add quick replies after welcome message
	setTimeout(() => {
		addQuickReplies();
	}, 1000);

	// Add pulse animation to toggle button after 3 seconds
	setTimeout(() => {
		chatbotToggle.classList.add("pulse");
	}, 3000);

	// Add notification badge after 5 seconds
	setTimeout(() => {
		addNotificationBadge();
	}, 5000);
}

function createChatbotHTML() {
	const chatbotHTML = `
        <div class="chatbot-container">
            <button class="chatbot-toggle" id="chatbot-toggle">
                <svg viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
            </button>
            
            <div class="chatbot-window" id="chatbot-window">
                <div class="chatbot-header">
                    <h3>🤖 HSTU CSE Club Assistant</h3>
                    <button class="chatbot-close" id="chatbot-close">×</button>
                </div>
                
                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="welcome-message">
                        👋 স্বাগতম! আমি HSTU CSE Club সম্পর্কে আপনাকে সাহায্য করতে পারি।
                    </div>
                </div>
                
                <div class="typing-indicator" id="typing-indicator">
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
                
                <div class="chatbot-input-area">
                    <input type="text" class="chatbot-input" id="chatbot-input" placeholder="আপনার প্রশ্ন লিখুন..." />
                    <button class="chatbot-send" id="chatbot-send">
                        <svg viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

	document.body.insertAdjacentHTML("beforeend", chatbotHTML);
}

function toggleChatbot() {
	chatbotWindow.classList.toggle("active");
	chatbotToggle.classList.remove("pulse");

	if (chatbotWindow.classList.contains("active")) {
		userInput.focus();
		// Scroll to bottom of messages
		setTimeout(() => {
			smoothScrollToBottom();
		}, 100);
	}
}

function addWelcomeMessage() {
	const welcomeMessage = `
        <div class="message bot">
            <strong>হ্যালো! 👋</strong><br>
            আমি HSTU CSE Club এর AI Assistant। আমি আপনাকে নিম্নলিখিত বিষয়গুলোতে সাহায্য করতে পারি:
            <br><br>
            📚 ক্লাব সম্পর্কিত তথ্য<br>
            🎯 ইভেন্ট ও কর্মশালা<br>
            👥 কমিটি সদস্যদের তথ্য<br>
            📅 আপকামিং ইভেন্ট<br>
            🏫 HSTU সম্পর্কিত প্রশ্ন<br><br>
            আপনার প্রশ্ন জিজ্ঞাসা করুন!
        </div>
    `;
	chatlog.innerHTML += welcomeMessage;
}

async function sendMessage() {
	const message = userInput.value.trim();
	if (!message) return;

	// Disable input and send button
	userInput.disabled = true;
	sendButton.disabled = true;

	// Add user message
	addMessage(message, "user");
	userInput.value = "";

	// Show typing indicator
	showTypingIndicator();

	try {
		const systemPrompt = `
You are an AI assistant who only answer questions related to HSTU and its CSE Club. 
If asked anything outside this scope, politely say that you're restricted to only HSTU and CSE Club topics.
Reply in Bangla if the question is in Bangla.
Always be helpful, friendly, and provide accurate information about HSTU CSE Club.
`;

		const response = await fetch(
			"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
				apiKey,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contents: [
						{ role: "user", parts: [{ text: systemPrompt }] },
						{ role: "user", parts: [{ text: message }] },
					],
				}),
			}
		);

		const data = await response.json();

		// Hide typing indicator
		hideTypingIndicator();

		if (
			data.candidates &&
			data.candidates[0] &&
			data.candidates[0].content &&
			data.candidates[0].content.parts[0]
		) {
			const reply = data.candidates[0].content.parts[0].text;
			addMessage(reply, "bot");
		} else {
			addMessage(
				"⚠️ দুঃখিত, কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
				"error"
			);
		}
	} catch (error) {
		console.error("Error:", error);
		hideTypingIndicator();
		addMessage(
			"⚠️ ইন্টারনেট সংযোগে সমস্যা। অনুগ্রহ করে আবার চেষ্টা করুন।",
			"error"
		);
	}

	// Re-enable input and send button
	userInput.disabled = false;
	sendButton.disabled = false;
	userInput.focus();
}

function showTypingIndicator() {
	typingIndicator.classList.add("active");
	smoothScrollToBottom();
}

function hideTypingIndicator() {
	typingIndicator.classList.remove("active");
}

// Add some helpful quick replies
function addQuickReplies() {
	const quickReplies = [
		"ক্লাব সম্পর্কে জানতে চাই",
		"আজকের ইভেন্ট কী?",
		"কমিটি সদস্যদের তালিকা",
		"সদস্যতা নিতে চাই",
	];

	const quickRepliesHTML = `
        <div class="quick-replies">
            ${quickReplies
				.map(
					(reply) => `
                <button class="quick-reply-btn" onclick="sendQuickReply('${reply}')">
                    ${reply}
                </button>
            `
				)
				.join("")}
        </div>
    `;

	chatlog.innerHTML += quickRepliesHTML;
}

function sendQuickReply(text) {
	userInput.value = text;
	sendMessage();
}

function addNotificationBadge() {
	if (!chatbotWindow.classList.contains("active")) {
		const badge = document.createElement("div");
		badge.className = "notification-badge";
		badge.textContent = "1";
		chatbotToggle.appendChild(badge);

		// Remove badge when chatbot is opened
		chatbotToggle.addEventListener(
			"click",
			function removeBadge() {
				const existingBadge = chatbotToggle.querySelector(
					".notification-badge"
				);
				if (existingBadge) {
					existingBadge.remove();
				}
				chatbotToggle.removeEventListener("click", removeBadge);
			},
			{ once: true }
		);
	}
}

// Add smooth scroll behavior for messages
function smoothScrollToBottom() {
	const scrollHeight = chatlog.scrollHeight;
	const clientHeight = chatlog.clientHeight;
	const maxScrollTop = scrollHeight - clientHeight;

	chatlog.scrollTo({
		top: maxScrollTop,
		behavior: "smooth",
	});
}

// Enhanced message adding with smooth scroll
function addMessage(text, type) {
	const messageDiv = document.createElement("div");
	messageDiv.className = `message ${type}`;
	messageDiv.innerHTML = text;
	chatlog.appendChild(messageDiv);

	// Smooth scroll to bottom
	setTimeout(() => {
		smoothScrollToBottom();
	}, 100);
}

const apiKey = "AIzaSyBIP6KFUuoM8oo_3q4ttDPNmNhw91gaii4";

// Chatbot UI Elements
let chatlog;
let userInput;
let sendButton;
let chatbotWindow;
let chatbotToggle;
let typingIndicator;

// HSTU ওয়েবসাইট থেকে কপি করা তথ্য (সংক্ষেপে)
const hstuInfo = `
হাজী মোহাম্মদ দানেশ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (HSTU) বাংলাদেশের একটি স্বনামধন্য পাবলিক বিশ্ববিদ্যালয়।

প্রতিষ্ঠা: ১৯৯৯ সাল
অবস্থান: দিনাজপুর, বাংলাদেশ
ওয়েবসাইট: https://www.hstu.ac.bd
যোগাযোগ: registrar@hstu.ac.bd, ফোন: +880247488001

প্রধান ভবনসমূহ: প্রশাসনিক ভবন, একাডেমিক ভবন, লাইব্রেরি, গবেষণা কেন্দ্র, ছাত্রাবাস, ছাত্রীনিবাস, মেডিকেল সেন্টার, খেলার মাঠ ইত্যাদি।

অনুষদসমূহ:
- কৃষি অনুষদ
- কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিং অনুষদ
- ইঞ্জিনিয়ারিং অনুষদ
- বিজনেস স্টাডিজ অনুষদ
- মৎস্য বিজ্ঞান অনুষদ
- ভেটেরিনারি ও এনিম্যাল সায়েন্স অনুষদ
- বিজ্ঞান অনুষদ
- সামাজিক বিজ্ঞান ও মানবিক অনুষদ

বিভাগসমূহ (উদাহরণ):
- কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE)
- ইলেকট্রিক্যাল অ্যান্ড ইলেকট্রনিক ইঞ্জিনিয়ারিং (EEE)
- সিভিল ইঞ্জিনিয়ারিং (CE)
- কৃষি
- মৎস্য
- ভেটেরিনারি
- ফুড প্রসেসিং

শিক্ষার্থী সংখ্যা: প্রায় ১২,০০০+
শিক্ষক সংখ্যা: প্রায় ৫০০+

বিশ্ববিদ্যালয়ের লক্ষ্য:
- আধুনিক ও মানসম্মত শিক্ষা প্রদান
- গবেষণা ও উদ্ভাবন
- জাতীয় ও আন্তর্জাতিক পর্যায়ে অবদান রাখা

CSE Club, HSTU:
CSE Club হলো হাজী মোহাম্মদ দানেশ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়ের কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং বিভাগের একটি ছাত্র সংগঠন।

ক্লাবের উদ্দেশ্য:
- শিক্ষার্থীদের প্রযুক্তিগত দক্ষতা বৃদ্ধি
- প্রোগ্রামিং প্রতিযোগিতা আয়োজন
- সেমিনার, ওয়ার্কশপ, ও টেক টক
- সফট স্কিল ও ক্যারিয়ার ডেভেলপমেন্ট
- জাতীয় ও আন্তর্জাতিক প্রতিযোগিতায় অংশগ্রহণ
- ক্লাব সদস্যদের মধ্যে নেটওয়ার্কিং ও সহযোগিতা

ক্লাবের নিয়মিত কার্যক্রম:
- ইনট্রা-ডিপার্টমেন্ট প্রোগ্রামিং কনটেস্ট
- সেমিনার ও ওয়ার্কশপ (প্রোগ্রামিং, ওয়েব ডেভেলপমেন্ট, AI, ক্যারিয়ার, ইত্যাদি)
- প্রোজেক্ট শো-কে'জ
- টিম বিল্ডিং ও মেম্বার মিটআপ
- সোশ্যাল ওয়ার্ক

ক্লাব সদস্যপদ:
- CSE বিভাগের যেকোনো শিক্ষার্থী সদস্য হতে পারে
- সদস্য হতে নির্দিষ্ট ফর্ম পূরণ ও ফি প্রদান করতে হয়
- সদস্যরা ক্লাবের সকল ইভেন্ট ও সুযোগ-সুবিধা পায়

ক্লাবের যোগাযোগ:
- ইমেইল: cseclub@hstu.ac.bd
- ফেসবুক: https://www.facebook.com/cseclubhstu
- অফিস: CSE Building, HSTU

বিশেষ অর্জন:
- ক্লাবের সদস্যরা জাতীয় ও আন্তর্জাতিক প্রোগ্রামিং কনটেস্টে পুরস্কারপ্রাপ্ত
- বিভিন্ন আইটি কোম্পানিতে ক্লাবের সাবেক সদস্যরা কর্মরত

নোটিশ, ভর্তি, রেজাল্ট, ও অন্যান্য তথ্যের জন্য বিশ্ববিদ্যালয়ের অফিসিয়াল ওয়েবসাইট দেখুন: https://www.hstu.ac.bd
`;

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

	userInput.disabled = true;
	sendButton.disabled = true;

	addMessage(message, "user");
	userInput.value = "";
	showTypingIndicator();

	try {
		// এখানে prompt তৈরি করুন
		const prompt = `
শুধুমাত্র নিচের তথ্যের ভিত্তিতে উত্তর দাও এবং সবসময় বাংলায় উত্তর দাও:
${hstuInfo}

প্রশ্ন: ${message}
`;

		const response = await fetch(
			"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-goog-api-key": apiKey,
				},
				body: JSON.stringify({
					contents: [
						{
							parts: [{ text: prompt }],
						},
					],
				}),
			}
		);

		const data = await response.json();
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

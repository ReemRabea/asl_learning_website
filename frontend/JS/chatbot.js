const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const typingIndicator = document.getElementById("typing-indicator");
const suggestionsBox = document.getElementById("suggestions-box");

// Expanded suggestions (you can add up to 100 entries here)
const allSuggestions = [
    "Tell me a fun fact",
    "History of ASL",
    "How to use webcam?",
    "Alphabet tips",
    "Etiquette",
    "Famous Deaf people",
    "ASL vs BSL",
    "What is a Sign Name?",
    "Fingerspelling help",
    "Deaf President Now",
    "Gallaudet University",
    "What is Audism?",
    "Can you sign under water?",
    "ASL in space",
    "Do monkeys use ASL?",
    "Black ASL history",
    "Helen Keller",
    "Lip reading accuracy",
    "How to get attention?",
    "Why pointing isn't rude",
    "Sign for 'Thank you'",
    "Sign for 'Sorry'",
    "What is a CODA?",
    "ASL accents",
    "Numbers 1-5 palm rule"
];

function initSuggestions() {
    suggestionsBox.innerHTML = '';
    const shuffled = allSuggestions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 8);
    selected.forEach(s => {
        const chip = document.createElement("div");
        chip.className = "suggestion-chip";
        chip.textContent = s;
        chip.onclick = () => {
            userInput.value = s;
            handleSendMessage();
        };
        suggestionsBox.appendChild(chip);
    });
}

function appendMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleSendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage(text, "user");
    userInput.value = "";
    typingIndicator.classList.remove("hidden");
    let reply = "Sorry, I couldn't retrieve a response.";
    try {
        const response = await fetch("http://localhost:5000/api/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });
        if (response.ok) {
            const data = await response.json();
            if (data.reply) {
                reply = data.reply;
            }
        }
    } catch (err) {
        console.error("Error contacting LLM backend:", err);
    }
    typingIndicator.classList.add("hidden");
    appendMessage(reply, "bot");
}

chatForm.onsubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
};

document.addEventListener("DOMContentLoaded", () => {
    initSuggestions();
});

// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ✅ Your Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "messages");

// HTML elements
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Send message
sendBtn.addEventListener("click", () => {
  const msg = messageInput.value.trim();
  if (msg) {
    push(chatRef, { text: msg });
    messageInput.value = "";
  }
});

// Display new messages
onChildAdded(chatRef, (data) => {
  const message = data.val();
  const div = document.createElement("div");
  div.classList.add("message", "sent");
  div.textContent = message.text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});

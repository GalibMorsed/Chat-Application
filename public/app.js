/*const socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
const roomsList = document.getElementById("rooms");
const currentRoomDisplay = document.getElementById("current-room");
const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("message-text");
const chatContainer = document.getElementById("chat-container");
const sendBtn = document.getElementById("send-btn");
const createRoomBtn = document.getElementById("create-room-btn");
const newRoomNameInput = document.getElementById("new-room-name");
const usernameOverlay = document.getElementById("username-overlay");
const usernameInput = document.getElementById("username-input");
const usernameSubmitBtn = document.getElementById("username-submit-btn");
const usernameDisplay = document.getElementById("username-display");

let currentRoom = null;
let username = null;

// Handle username submission
usernameSubmitBtn.addEventListener("click", () => {
  const chosenUsername = usernameInput.value.trim();
  if (chosenUsername) {
    socket.emit("set-username", chosenUsername, (isAvailable) => {
      if (isAvailable) {
        username = chosenUsername;
        usernameOverlay.style.display = "none";
        chatContainer.style.display = "flex";
        usernameDisplay.textContent = `Logged in as: ${username}`;
      } else {
        alert("Username already taken, please choose another.");
      }
    });
  }
});

// Create a new room
createRoomBtn.addEventListener("click", () => {
  const roomName = newRoomNameInput.value.trim();
  if (roomName) {
    socket.emit("create-room", roomName);
    newRoomNameInput.value = "";
  }
});

// Join a room
roomsList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    currentRoom = event.target.textContent;
    console.log("Joining room:", currentRoom);
    socket.emit("join-room", currentRoom);
    currentRoomDisplay.textContent = `Current Room: ${currentRoom}`;
    messagesContainer.innerHTML = ""; // Clear chat messages when switching rooms
  }
});

// Send a message
sendBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message && currentRoom) {
    console.log(`Sending message to ${currentRoom}: ${message}`);
    socket.emit("user-message", { message, username });
    messageInput.value = "";
  }
});

// Receive messages
socket.on("message", ({ message, username }) => {
  console.log(`Message received: ${username}: ${message}`);
  const p = document.createElement("p");
  p.textContent = `${username}: ${message}`;
  messagesContainer.appendChild(p);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to the latest message
});

// Update room list
socket.on("room-list", (rooms) => {
  roomsList.innerHTML = "";
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.textContent = room;
    roomsList.appendChild(li);
  });
});
*/

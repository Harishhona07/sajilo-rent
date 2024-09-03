const history = ["Bot: Hi there! How can I help you today?"];

const chatContainer = document.querySelector(".chat");

// Function to apply the selected theme
function applyTheme(theme) {
  localStorage.setItem("theme", theme);
  if (theme == "Matrix") {
    setMatrixTheme(theme);
  } else if (theme == "Light") {
    setLightTheme(theme);
  } else {
    mainContent.className = "";
    document.body.style.background = "rgb(9, 2, 23)";
    document.body.style.backgroundImage = "none";
  }
}

// Function to set the Matrix theme
function setMatrixTheme(theme) {
  localStorage.setItem("theme", theme);
  mainContent.classList.add("matrix");
  mainContent.classList.remove("light");
  document.body.style.backgroundImage =
    "url(https://wallpapers.com/images/hd/minimal-neon-green-matrix-g26ua7n10dp49h56.jpg)";
}

function setLightTheme(theme) {
  localStorage.setItem("theme", theme);
  mainContent.classList.remove("matrix");
  mainContent.classList.add("light");
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#f1f1f1";
}

function sendUserMessage(userInput) {
  history.push("User: " + userInput);
  console.log(history);

  // Create the outer div with the class "bot"
  const userDiv = document.createElement("div");
  userDiv.classList.add("user");

  // Create the paragraph element with the class "message-box"
  const messageBox = document.createElement("p");
  messageBox.classList.add("message-box");
  messageBox.textContent = userInput;

  userDiv.appendChild(messageBox);

  // Append the entire botDiv to the chat container
  chatContainer.appendChild(userDiv);
}

// Get the dialog elements
const chatButton = document.getElementById("chatButton");
const chatDialog = document.getElementById("chatDialog");
const closeChat = document.getElementById("closeChat");

// Event listener to open the chatbot
chatButton.addEventListener("click", function () {
  chatDialog.style.display = "block";
});

// Event listener to close the chatbot
closeChat.addEventListener("click", function () {
  chatDialog.style.display = "none";
});

// Close the chatbot when clicking outside of the chat container
window.addEventListener("click", function (event) {
  if (event.target === chatDialog) {
    chatDialog.style.display = "none";
  }
});

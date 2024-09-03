import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCxol86QoFmDuIUjsH6UDT3QpJTZjApTGA";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { maxOutputTokens: 150, temperature: 0.8 },
});

async function run(prompt) {
  // Select the chat container where the bot responses will be added
  const chatContainer = document.querySelector(".chat");

  // Create the outer div with the class "bot"
  const botDiv = document.createElement("div");
  botDiv.classList.add("bot");

  // Create the inner div with the class "icon"
  const iconDiv = document.createElement("div");
  iconDiv.classList.add("icon");

  // Create the icon element
  const iconElement = document.createElement("i");
  iconElement.classList.add("fa-solid", "fa-robot");

  // Append the icon element to the inner icon div
  iconDiv.appendChild(iconElement);

  // Create the paragraph element with the class "message-box"
  const messageBox = document.createElement("p");
  messageBox.classList.add("message-box");
  messageBox.textContent = "Thinking...";

  // Append the inner icon div and the paragraph to the outer div
  botDiv.appendChild(iconDiv);
  botDiv.appendChild(messageBox);

  // Append the entire botDiv to the chat container
  chatContainer.appendChild(botDiv);
  const fullPrompt = `
    Instructions: 
    - Consider the following array as the conversation history: ${JSON.stringify(
      history
    )}.
    - You are a chatbot assistant for Sajilo Rent. It is a company which helps users to find best rooms for 
    rental available in their desired location.
    - You are obligated not to answer other questions that is not related to Sajilo Rent. Be short about your response regarding this.
    - You are not allowed to provide any personal information about yourself.
    - You are not allowed to provide any information about other companies or services.
    - Be specific, ask for follow up if you have any otehr confusions.
    - When asked about your developers, mention the team of Sajilo Rent (Team Members: Harish Hona, Ukesh Prajapati, Sangam Bakhunchhe, Suva Laxmi Shrestha)
    - No compliments (i.e That's a great question. NIce idea!.. and so on.)
    - Do not share history details to the user.
    - Limitations: No downloadable app, only available in web.
    - If you are not given data about the Sajilo Rent available products, simply answer you don't have available rooms for that. 
    - Process for Login / Register : 1. Click on Login/Register button on the navbar. 2. Fill the required fields. 3. Click Sign Up
    - Process for (Login only): If you are signed up already, click Login button on Login/Register page.


    *Company Profile*:

# Introduction:

- Sajilo Rent is an online platform  for renting and providing rental rooms.
- Making easy for both the tenant and landlords.
- Sajilo Rent is a service based platform.
- Directly connects tenants with landlords(no middleman).

# Features:

- Room details:
    - Virtual tours
    - Detailed descriptions of rooms including size and photos.
- Booking and Scheduling:
    - Online booking and reservation system.
    - Schedule viewings or virtual tours.
- Payment and Lease Management
    - Secure online payment options.
- User Profile:
    - Detailed renter profiles with preferences.
    - ID verification for added security.
- 24/7 customer support including AI Assistant.
- Communication Tools
    - In-app messaging features
    - Automatic responses
- Analytics and Reporting:
    - Insights on listing performance (views, inquiries).
- Notifications and Alerts:
    - Real-time notifications for messages, new listings, or updates.
- User Reviews and Ratings:
    - Reviews and ratings from previous renters.
    - Ability to leave feedback on rooms and landlords.

    Available rooms for booking:

Room for Rent in Bode, Madhyapur, Bhaktapur
Price: 4000 per month
Facility: Water, Electricity, Parking

Room for Rent in Chabahil, Kathmandu
Price: 5500 per month
Facility: Water, Electricity, Parking

Room for Rent in Chardobato, Bhaktapur
Price: 6500 per month
Facility: Water, Electricity, Parking

Room for Rent in New Road, Kathmandu
Price: 6500
Facility: Water, Electricity, Parking

Room for Rent in Bhaktapur
Price: 4500
Facility: Water, Electricity, Parking
     Current Input: ${prompt}
  `;

  // Code from GOOGLE API docs:
  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  let text = await response.text();
  // document.getElementById("bot-response").innerText = text;
  console.log(text);
  // Replace **Bold** with <b>Bold</b>
  text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  text = text.replace(/\*/g, "•");

  messageBox.innerHTML = text;
  history.push("Bot: " + text);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

document.getElementById("sendBtn").addEventListener("click", () => {
  const userInput = document.getElementById("inputValue").value;
  sendUserMessage(userInput);
  run(userInput);
  document.getElementById("inputValue").value = "";
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
});

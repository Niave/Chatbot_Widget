// Get references to the button and the container
const chatbotButton = document.getElementById('chatbot-button');
const chatbotContainer = document.getElementById('chatbot-container');

// Toggle visibility of the chatbot container when the button is clicked
chatbotButton.addEventListener('click', () => {
    if (chatbotContainer.style.display === "none" || chatbotContainer.style.display === "") {
        chatbotContainer.style.display = "block";
    } else {
        chatbotContainer.style.display = "none";
    }
});

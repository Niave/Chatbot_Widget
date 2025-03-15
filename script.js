const sendButton = document.getElementById('send-button');
const userMessageInput = document.getElementById('user-message');
const chatMessages = document.getElementById('chat-messages');

sendButton.addEventListener('click', () => {
    const userMessage = userMessageInput.value.trim();
    if (userMessage === "") return;

    // Display user message
    displayMessage('User: ' + userMessage, 'user');

    // Clear the input field
    userMessageInput.value = "";

    // Send message to Make Webhook
    sendMessageToMake(userMessage);
});

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add(sender);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
}

async function sendMessageToMake(message) {
    const webhookURL = 'YOUR_MAKE_WEBHOOK_URL'; // Replace with your Make webhook URL
    
    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        
        // Display bot response
        if (data.response) {
            displayMessage('Bot: ' + data.response, 'bot');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

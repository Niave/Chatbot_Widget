(function() {
    // Create a floating button for the chatbot
    var chatbotButton = document.createElement('div');
    chatbotButton.id = 'chatbot-button';
    chatbotButton.innerHTML = '🗨️';
    chatbotButton.style.position = 'fixed';
    chatbotButton.style.bottom = '20px';
    chatbotButton.style.right = '20px';
    chatbotButton.style.width = '50px';
    chatbotButton.style.height = '50px';
    chatbotButton.style.backgroundColor = '#007BFF';
    chatbotButton.style.color = 'white';
    chatbotButton.style.borderRadius = '50%';
    chatbotButton.style.display = 'flex';
    chatbotButton.style.justifyContent = 'center';
    chatbotButton.style.alignItems = 'center';
    chatbotButton.style.cursor = 'pointer';
    chatbotButton.style.fontSize = '24px';
    chatbotButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    document.body.appendChild(chatbotButton);

    // Create the chatbot container
    var chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.style.position = 'fixed';
    chatbotContainer.style.bottom = '20px';
    chatbotContainer.style.right = '20px';
    chatbotContainer.style.width = '400px';
    chatbotContainer.style.height = '600px';
    chatbotContainer.style.display = 'none';
    chatbotContainer.style.zIndex = '9999';
    chatbotContainer.style.border = '2px solid #ccc';
    chatbotContainer.style.borderRadius = '8px';

    // Create chat messages container
    var chatMessages = document.createElement('div');
    chatMessages.id = 'chat-messages';
    chatMessages.style.overflowY = 'auto';
    chatMessages.style.height = '100%';
    chatbotContainer.appendChild(chatMessages);

    // Create the user input section
    var userMessageInput = document.createElement('input');
    userMessageInput.id = 'user-message';
    userMessageInput.type = 'text';
    userMessageInput.style.width = '100%';
    userMessageInput.style.height = '50px';
    chatbotContainer.appendChild(userMessageInput);

    var sendButton = document.createElement('button');
    sendButton.id = 'send-button';
    sendButton.textContent = 'Send';
    chatbotContainer.appendChild(sendButton);

    document.body.appendChild(chatbotContainer);

    // Toggle visibility of the chatbot container when the button is clicked
    chatbotButton.addEventListener('click', function() {
        if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
            chatbotContainer.style.display = 'block';
        } else {
            chatbotContainer.style.display = 'none';
        }
    });

    // Function to display messages in the chat window
    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add(sender); // Add 'user' or 'bot' class for styling
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
    }

    // Send message to Make Webhook
    async function sendMessageToMake(message) {
        const webhookURL = 'https://hook.eu2.make.com/o7saj7j0sr2xt4ny3aofuvbfw2q5fevv'; // Replace with your Make webhook URL

        try {
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }), // Send the user message to Make
            });

            const data = await response.json();

            // If Make sends a response, display it
            if (data.response) {
                displayMessage('Bot: ' + data.response, 'bot');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    // Handle send button click
    sendButton.addEventListener('click', () => {
        const userMessage = userMessageInput.value.trim();
        if (userMessage === "") return; // Do not send if message is empty

        displayMessage('User: ' + userMessage, 'user');
        userMessageInput.value = ''; // Clear input field
        sendMessageToMake(userMessage);
    });
})();

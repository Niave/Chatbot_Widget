(function() {
    // Create the floating button for the chatbot
    const chatbotButton = document.createElement('div');
    chatbotButton.id = 'chatbot-button';
    chatbotButton.innerHTML = '🗨️';
    document.body.appendChild(chatbotButton);

    // Create the chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    document.body.appendChild(chatbotContainer);

    // Create header for chatbot
    const header = document.createElement('div');
    header.className = 'header';
    header.textContent = 'Chatbot';

    // Create Close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '❌';

    // Create Minimize button
    const minimizeButton = document.createElement('button');
    minimizeButton.className = 'minimize-button';
    minimizeButton.innerHTML = '🔽';

    header.appendChild(minimizeButton);
    header.appendChild(closeButton);
    chatbotContainer.appendChild(header);

    // Create message container
    const chatMessages = document.createElement('div');
    chatMessages.id = 'chat-messages';
    chatbotContainer.appendChild(chatMessages);

    // Create message input field
    const userMessageInput = document.createElement('input');
    userMessageInput.id = 'user-message';
    userMessageInput.type = 'text';
    chatbotContainer.appendChild(userMessageInput);

    // Create send button
    const sendButton = document.createElement('button');
    sendButton.id = 'send-button';
    sendButton.textContent = 'Send';
    chatbotContainer.appendChild(sendButton);

    // Toggle chatbot visibility
    chatbotButton.addEventListener('click', () => {
        if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
            chatbotContainer.style.display = 'block';
            displayMessage('Bot: Hello! How can I assist you today?', 'bot');
        } else {
            chatbotContainer.style.display = 'none';
        }
    });

    // Close chatbot functionality
    closeButton.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });

    // Minimize chatbot functionality
    minimizeButton.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
        chatbotButton.style.display = 'flex';
    });

    // Function to display messages
    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message ' + sender;
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message to external service
    async function sendMessageToMake(message) {
        const webhookURL = 'https://hook.eu2.make.com/o7saj7j0sr2xt4ny3aofuvbfw2q5fevv';  // Replace with actual webhook

        try {
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            const data = await response.json();
            if (data.response) {
                displayMessage('Bot: ' + data.response, 'bot');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Handle send button click
    sendButton.addEventListener('click', () => {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            displayMessage('User: ' + userMessage, 'user');
            userMessageInput.value = ''; // Clear input
            sendMessageToMake(userMessage);
        }
    });
})();

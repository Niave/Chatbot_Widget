(function () {
    // Create the floating button for the chatbot
    const chatbotButton = document.createElement('div');
    chatbotButton.id = 'chatbot-button';
    chatbotButton.innerHTML = '🗨️';

    // Apply styles to the button
    chatbotButton.style.position = 'fixed';
    chatbotButton.style.bottom = '20px'; // Place at the bottom
    chatbotButton.style.right = '20px'; // Place at the right
    chatbotButton.style.width = '40px'; // Set size
    chatbotButton.style.height = '40px'; // Set size
    chatbotButton.style.backgroundColor = '#007BFF'; // Blue background color
    chatbotButton.style.color = 'white'; // White icon color
    chatbotButton.style.borderRadius = '50%'; // Rounded button
    chatbotButton.style.display = 'flex'; // Use flexbox to center the icon
    chatbotButton.style.justifyContent = 'center'; // Center content horizontally
    chatbotButton.style.alignItems = 'center'; // Center content vertically
    chatbotButton.style.fontSize = '20px'; // Increase the size of the icon
    chatbotButton.style.cursor = 'pointer'; // Make it clickable
    chatbotButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)'; // Shadow for depth
    chatbotButton.style.transition = 'background-color 0.3s ease'; // Smooth hover transition

    // Prevent text selection on the button
    chatbotButton.style.userSelect = 'none'; // Disable text selection

    // Hover effect for the button
    chatbotButton.addEventListener('mouseover', () => {
        chatbotButton.style.backgroundColor = '#0056b3'; // Darker blue on hover
    });

    chatbotButton.addEventListener('mouseout', () => {
        chatbotButton.style.backgroundColor = '#007BFF'; // Original blue color
    });

    // Append the button to the document body directly
    document.body.appendChild(chatbotButton);

    // Create a container for the shadow DOM and attach a shadow root
    const shadowHost = document.createElement('div');
    document.body.appendChild(shadowHost);

    const shadowRoot = shadowHost.attachShadow({
        mode: 'open'
    });

    // Inject the CSS styles into the shadow DOM
    const style = document.createElement('style');
    style.textContent = `
        /* Chatbot container with solid border */
        #chatbot-container {
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 380px;
            min-height: 50vh;
            max-height: 90vh;
            display: none;
            z-index: 9999;
            border-radius: 10px;
            overflow: hidden;
            background: white;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            font-family: 'Arial', sans-serif;
            border: 2px solid #007BFF;

        }

        /* Navbar styling */
        #chatbot-navbar {
            background-color: #0056b3;
            padding: 10px;
            color: white;
            font-size: 18px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        #chatbot-navbar img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }

        /* Chat messages container */
        #chat-messages {
            padding: 10px;
            overflow-y: auto;
            max-height: calc(100% -80px);
            min-height: 450px;
            background-color: #f9f9f9;
        }

        /* Message styling */
        #chat-messages .message {
            padding: 8px 12px;
            border-radius: 15px;
            margin-bottom: 8px;
            max-width: 80%;
            clear: both;
            word-wrap: break-word;
        }

        /* User message */
        #chat-messages .user {
            background-color: #007BFF;
            color: white;
            float: right;
            margin-left: 30px;
            border-radius: 15px 15px 0px 15px;
        }

        /* Bot message */
        #chat-messages .bot {
            background-color: #e0e0e0;
            color: black;
            float: left;
            margin-right: 30px;
            border-radius: 15px 15px 15px 0px;
        }

        /* Input box */
        #chatbot-container .input-box {
            display: flex;
            padding: 10px;
            border-top: 1px solid #ccc;
            background-color: #f9f9f9;
        }

        #chatbot-container .input-box input {
            flex-grow: 1;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 16px;
        }

        #chatbot-container .input-box button {
            padding: 10px;
            margin-left: 10px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        #chatbot-container .input-box button:hover {
            background-color: #0056b3;
        }
    `;
    shadowRoot.appendChild(style);

    // Create the chatbot container in the shadow DOM
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    shadowRoot.appendChild(chatbotContainer);

    // Create navbar for chatbot with logo and title
    const navbar = document.createElement('div');
    navbar.id = 'chatbot-navbar';

    const logo = document.createElement('img');
    logo.src = 'https://firebasestorage.googleapis.com/v0/b/voiceglow-cdn/o/public%2F90l23re6_.png?alt=media'; // Replace with your logo
    navbar.appendChild(logo);

    const title = document.createElement('span');
    title.textContent = 'Mustafa - AI Assistent';
    navbar.appendChild(title);

    chatbotContainer.appendChild(navbar);

    // Create message container
    const chatMessages = document.createElement('div');
    chatMessages.id = 'chat-messages';
    chatbotContainer.appendChild(chatMessages);

    // Create the infoContainer that will be part of the chat scroll
    const infoContainer = document.createElement('div');
    infoContainer.id = 'info-container';
    chatMessages.appendChild(infoContainer);

    // Create logo for the info container
    const infoLogo = document.createElement('img');
    infoLogo.src = 'https://firebasestorage.googleapis.com/v0/b/voiceglow-cdn/o/public%2F90l23re6_.png?alt=media';
    infoLogo.id = 'info-logo';
    infoContainer.appendChild(infoLogo);

    // Create the info message inside the container
    const infoMessage = document.createElement('p');
    infoMessage.textContent = 'Mustafa - AI Assistent';
    infoContainer.appendChild(infoMessage);

    // Style the infoContainer
    infoContainer.style.textAlign = 'center';
    infoContainer.style.padding = '10px';

    // Style the logo inside the infoContainer
    infoLogo.style.display = 'block';
    infoLogo.style.margin = '0 auto';
    infoLogo.style.width = '50px';
    infoLogo.style.height = 'auto';

    // Style the text inside the infoContainer
    infoMessage.style.fontWeight = 'bold';
    infoMessage.style.marginTop = '10px';

    // Set height, max-height, and overflow for chat messages to ensure scrollability
    //chatMessages.style.minHeight = '200px';
    chatMessages.style.maxHeight = '500px';
    //chatMessages.style.overflowY = 'hidden';
    chatMessages.style.padding = '10px';
    chatMessages.style.transition = 'max-height 0.3s ease-in-out';

    // Create message input field and send button container
    const inputBox = document.createElement('div');
    inputBox.className = 'input-box';
    chatbotContainer.appendChild(inputBox);

    const userMessageInput = document.createElement('input');
    userMessageInput.id = 'user-message';
    userMessageInput.type = 'text';
    userMessageInput.placeholder = 'Type a message...';
    inputBox.appendChild(userMessageInput);

    const sendButton = document.createElement('button');
    sendButton.id = 'send-button';
    sendButton.textContent = 'Send';
    inputBox.appendChild(sendButton);

    // Variable to track whether greeting has been shown
    let greetingShown = false;

    // Background color for the chatbot container (can be dynamic or static)
    const backgroundColor = '#f9f9f9'; // Adjust this as needed (light background color)

    // Set background color for chatbot container
    chatbotContainer.style.backgroundColor = backgroundColor;

    // Toggle chatbot visibility
    chatbotButton.addEventListener('click', () => {
        if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
            chatbotContainer.style.display = 'block';
            if (!greetingShown) {
                // Display formatted greeting message inside the message container
                displayMessage(` 
                    <div style="display: flex; align-items: center; font-family: 'Roboto', sans-serif; color: #333; line-height: 1.6; font-size: 16px;">
                        <div>
                            <p style="margin-bottom: 15px;">Hei!</p>
                            <p style="margin-bottom: 15px;">Jeg er <strong>Mustafa</strong> sin AI assistent.</p>
                            <p style="margin-bottom: 15px;">Jeg kan svare på spørsmål om våre sentre, åpningstider, medlemskap og andre relevante spørsmål om oss.</p>
                            <p style="margin-bottom: 15px;">Du kan alltid kontakte oss direkte på 
                            <a href="mailto:kundeservice@Mustafa.no" style="color: #1a73e8; text-decoration: none;">kundeservice@Mustafa.no</a>.
                            </p>
                            <p style="font-size: 15px; font-weight: bold; color: #333; margin-top: 15px;">Hva kan jeg hjelpe deg med?</p>
                        </div>
                </div>`, 'bot');
                greetingShown = true;
            }
        } else {
            chatbotContainer.style.display = 'none';
        }
    });

    // Function to display messages
    function displayMessage(message, sender, isFirstMessage = false) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message ' + sender;

        if (isFirstMessage) {
            messageElement.innerHTML = `<strong>${message}</strong>`;
        } else {
            messageElement.innerHTML = message;
        }

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (chatMessages.scrollHeight > chatMessages.offsetHeight) {
            chatMessages.style.overflowY = 'scroll';
        }
    }

    // Function to handle the thinking message disappearing
    function handleThinkingMessageDisappearance(thinkingMessageElement) {
        thinkingMessageElement.style.opacity = '0';
        thinkingMessageElement.style.transition = 'opacity 1s ease-out';
        setTimeout(() => {
            thinkingMessageElement.remove();
        }, 1000);
    }

    // Handle send button click
    function sendMessage() {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            userMessageInput.value = '';

            const thinkingMessage = displayMessage("⏳ Thinking...", 'bot', true);
            sendMessageToMake(userMessage, thinkingMessage);
        }
    }

    // Send message to external service
    async function sendMessageToMake(message, thinkingMessageElement) {
        // Remove "thinking" message after 1 second
        handleThinkingMessageDisappearance(thinkingMessageElement);
    }

    // Handle Enter key to send message
    userMessageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    // Attach event listener to the send button
    sendButton.addEventListener('click', () => {
        sendMessage();
    });
    // Function to handle the thinking message disappearing
function handleThinkingMessageDisappearance(thinkingMessageElement) {
    thinkingMessageElement.style.opacity = '0';
    thinkingMessageElement.style.transition = 'opacity 1s ease-out';
    setTimeout(() => {
        thinkingMessageElement.remove(); // Remove it after the fade-out effect
    }, 1000); // Duration of the fade-out effect
}

// Handle send button click
function sendMessage() {
    const userMessage = userMessageInput.value.trim();
    if (userMessage) {
        displayMessage(userMessage, 'user');  // Display user's message
        userMessageInput.value = ''; // Clear input

        // Display "thinking..." message from bot
        const thinkingMessage = displayMessage("⏳ Thinking...", 'bot', true);

        // Send the message and handle the response after the "thinking..." message disappears
        sendMessageToMake(userMessage, thinkingMessage);
    }
}

// Send message to external service (Make webhook)
async function sendMessageToMake(message, thinkingMessageElement) {
    const webhookURL = 'https://hook.eu2.make.com/o7saj7j0sr2xt4ny3aofuvbfw2q5fevv';  // Replace with actual webhook
    
    try {
        // Prepare the request payload
        const payload = JSON.stringify({
            userMessage: message
        });

        // Send the message to the external service via POST request
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload
        });

        const responseText = await response.text();  // Get the response text

        try {
            // Try to parse it as JSON
            const data = JSON.parse(responseText);

            if (data.response) {
                // Remove the "thinking..." message with fade-out effect
                handleThinkingMessageDisappearance(thinkingMessageElement);

                // Display the actual response from the bot
                displayMessage(data.response, 'bot');
            } else {
                console.error('Response does not contain "response" field');
                handleThinkingMessageDisappearance(thinkingMessageElement);  // Remove thinking message
                displayMessage("Sorry, I couldn't understand that.", 'bot');  // Fallback message
            }
        } catch (error) {
            console.error('Error parsing response:', error);
            handleThinkingMessageDisappearance(thinkingMessageElement);  // Remove thinking message
            displayMessage("Sorry, there was an error with the response.", 'bot');  // Error fallback message
        }

    } catch (error) {
        console.error('Error sending message:', error);
        handleThinkingMessageDisappearance(thinkingMessageElement);  // Remove thinking message
        displayMessage("Sorry, there was an issue sending your message.", 'bot');  // Error fallback message
    }
}

    // Function to display messages
    function displayMessage(message, sender, isFirstMessage = false) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message ' + sender;
        
        // If it's the first bot message, remove the "Bot:" text
        if (isFirstMessage) {
            messageElement.innerHTML = `<strong>${message}</strong>`;
        } else {
            messageElement.innerHTML = message;
        }
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Automatically scroll to the latest message

        // Check if the messages overflow beyond max height
        if (chatMessages.scrollHeight > chatMessages.offsetHeight) {
            chatMessages.style.overflowY = 'scroll'; // Show scroll when overflow occurs
        }
    }

    // Function to handle the thinking message disappearing
    function handleThinkingMessageDisappearance(thinkingMessageElement) {
        thinkingMessageElement.style.opacity = '0';
        thinkingMessageElement.style.transition = 'opacity 1s ease-out';
        setTimeout(() => {
            thinkingMessageElement.remove(); // Remove it after the fade-out effect
        }, 1000); // Duration of the fade-out effect
    }

    // Handle send button click
    function sendMessage() {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');  // Display user's message
            userMessageInput.value = ''; // Clear input

            // Display "thinking..." message from bot
            const thinkingMessage = displayMessage("⏳ Thinking...", 'bot', true);

            // Call sendMessageToMake and remove "thinking..." message after response
            sendMessageToMake(userMessage, thinkingMessage);
        }
    }

    // Send message to external service
    async function sendMessageToMake(message, thinkingMessageElement) {
        const webhookURL = 'https://hook.eu2.make.com/o7saj7j0sr2xt4ny3aofuvbfw2q5fevv';  // Replace with actual webhook

        try {
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_message: message })
            });

            // Check if the response is ok (status 2xx)
            if (!response.ok) {
                console.error(`Error: HTTP status ${response.status}`);
                return;
            }

            // Try parsing the response as JSON
            const responseText = await response.text();  // Get response as plain text first
            try {
                const data = JSON.parse(responseText);  // Try to parse it as JSON
                if (data.response) {
                    // Remove the "thinking..." message with effect
                    handleThinkingMessageDisappearance(thinkingMessageElement);

                    // Display actual response
                    displayMessage(data.response, 'bot');
                } else {
                    console.error('Response does not contain "response" field');
                }
            } catch (jsonError) {
                console.error('Error parsing response as JSON:', jsonError);
                console.log('Non-JSON response:', responseText);  // Log the raw response
                // Handle the non-JSON response accordingly, e.g., display the raw message
                displayMessage(responseText, 'bot');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Add event listener for the send button
    sendButton.addEventListener('click', sendMessage);

    // Add event listener for the Enter key
    userMessageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();  // Prevent form submission if in a form
            sendMessage();
        }
    });
})();
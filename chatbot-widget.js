(function () {
    // Create the floating button for the chatbot
    const chatbotButton = document.createElement('div');
    chatbotButton.id = 'chatbot-button';
    chatbotButton.innerHTML = '💬';

    // Apply styles to the button
   
    chatbotButton.style.position = 'fixed';
    chatbotButton.style.bottom = '20px';
    chatbotButton.style.right = '20px';
    chatbotButton.style.width = '50px';  // Adjust width to fit the symbol
    chatbotButton.style.height = '50px'; // Adjust height to fit the symbol
    chatbotButton.style.backgroundColor = '#A0430A';
    chatbotButton.style.color = 'white';
    chatbotButton.style.borderRadius = '50%';
    chatbotButton.style.display = 'flex';
    chatbotButton.style.justifyContent = 'center';
    chatbotButton.style.alignItems = 'center';
    chatbotButton.style.fontSize = '24px'; // Ensure the font size is large enough for the symbol
    chatbotButton.style.cursor = 'pointer';
    chatbotButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';

    
    // Prevent text selection on the button
    chatbotButton.style.userSelect = 'none'; // Disable text selection

    // Hover effect for the button
    chatbotButton.addEventListener('mouseover', () => {
        chatbotButton.style.backgroundColor = '#8C3708'; // darker copper
    });

    chatbotButton.addEventListener('mouseout', () => {
        chatbotButton.style.backgroundColor = '#A0430A'; // Original copper color
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
    bottom: 20px;
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
    font-family: 'Roboto', sans-serif;
    border: 2px solid #ccc;
}

/* Chatbot button */
#chatbot-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #A0430A;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease;
    user-select: none;
}

#chatbot-button:hover {
    background-color: #8C3708;
}

/* Navbar styling */
#chatbot-navbar {
    background-color: #8C3708;
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
    padding: 15px;  /* Increased padding for a cleaner look */
    overflow-y: auto;
    max-height: calc(100% - 80px);
    min-height: 450px;
    background-color: #f9f9f9;
    font-size: 16px; /* Adjusted font size */
    line-height: 1.6; /* Increased line height */
}

/* Thinking message styling */
#chat-messages .thinking-message {
    padding: 8px 12px;
    border-radius: 15px;
    margin-bottom: 8px;
    max-width: 80%;
    clear: both;
    word-wrap: break-word;
    white-space: nowrap;
    overflow: hidden;
    width: 20px;
    height: 25px;
    line-height: 25px;
    font-size: 20px;
    text-overflow: ellipsis;
}

/* Message styling */
#chat-messages .message {
    padding: 10px 15px;  /* Added more padding for better spacing */
    border-radius: 15px;
    margin-bottom: 12px;  /* Adjusted bottom margin */
    max-width: 80%;
    clear: both;
    word-wrap: break-word;
    line-height: 1.5;  /* Improved line-height for messages */
}

/* User message */
#chat-messages .user {
    background-color: #A0430A;
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
    padding: 12px; /* Increased padding for better UI */
    border-top: 1px solid #ccc;
    background-color: #f9f9f9;
}

#chatbot-container .input-box input {
    flex-grow: 1;
    padding: 12px;  /* Added more padding */
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
}

#chatbot-container .input-box button {
    padding: 12px;  /* Adjusted padding */
    margin-left: 10px;
    background-color: #A0430A;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#chatbot-container .input-box button:hover {
    background-color: #8C3708;
}

/* Responsive Design for Mobile */
@media (max-width: 767px) {
    #chatbot-button {
        bottom: 0px;
        right: 10px;
        width: 35px;
        height: 35px;
        font-size: 18px;
    }

    #chatbot-container {
        width: 100%;
        max-width: 350px;
        bottom: 0px;
        right: 10px;
        max-height: 80vh;
    }

    #chat-messages {
        max-height: calc(100% - 140px);
        min-height: 200px;
    }

    #chatbot-container .input-box {
        padding: 8px;
    }

    #chatbot-container .input-box input {
        font-size: 14px;
    }

    #chatbot-container .input-box button {
        font-size: 14px;
        padding: 8px;
    }

    #chatbot-navbar {
        font-size: 16px;
    }
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
    logo.src = 'Images/Mustafa.png'; // Replace with your logo
    navbar.appendChild(logo);

    const title = document.createElement('span');
    title.textContent = 'Mustafa - AI Assistent';
    navbar.appendChild(title);


  
    // Minimize Button
    const minimizeButton = document.createElement('button');
    minimizeButton.innerHTML = '&minus;';  // Minimize button with '-' symbol
    minimizeButton.style.fontSize = '20px';
    minimizeButton.style.cursor = 'pointer';
    minimizeButton.style.background = 'transparent';
    minimizeButton.style.border = 'none';
    minimizeButton.style.color = '#fff';
    minimizeButton.style.marginLeft = 'auto'; // Align to the right of navbar
    navbar.appendChild(minimizeButton);
      // Exit Button
    const exitButton = document.createElement('button');
    exitButton.innerHTML = '&times;';  // Exit button with '×' symbol
    exitButton.style.fontSize = '20px';
    exitButton.style.cursor = 'pointer';
    exitButton.style.background = 'transparent';
    exitButton.style.border = 'none';
    exitButton.style.color = '#fff';
    navbar.appendChild(exitButton);
  

    chatbotContainer.appendChild(navbar);

    minimizeButton.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';  // Hide the UI
        chatbotButton.style.display = 'flex';   // Show the floating button again
    });
    
    // Exit button event: Close the chatbot and reset the chat
    exitButton.addEventListener('click', () => {
        // Hide the chatbot and show the floating button again
        chatbotContainer.style.display = 'none';
        chatbotButton.style.display = 'flex';  // Show the floating button again
    
        // Clear only the chat history, not the entire container
        Array.from(chatMessages.children).forEach(child => {
            if (child.classList.contains('message')) {
                child.remove();  // Remove only dynamic chat messages (user and bot messages)
            }
        });

        greetingShown = false;
    });

    


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
    infoLogo.src = 'Images/Mustafa.png';
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
    userMessageInput.autocomplete = 'off';

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
        chatbotButton.style.display = 'none';  // Hide the floating button when the UI is open
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
        chatbotContainer.style.display = 'none';  // Hide the UI when it's already visible
        chatbotButton.style.display = 'flex';   // Show the floating button again
    }
});

     // Handle send button click
     function sendMessage() {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');  // Display user's message
            userMessageInput.value = ''; // Clear input
            // Call sendMessageToMake and remove "thinking..." message after response


            sendMessageToMake(userMessage);
        }
    }

      // Function to display messages
      function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message ' + sender;
        messageElement.innerHTML = message;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Automatically scroll to the latest message

        // Check if the messages overflow beyond max height
        if (chatMessages.scrollHeight > chatMessages.offsetHeight) {
            chatMessages.style.overflowY = 'scroll'; // Show scroll when overflow occurs
        }
    }

    // Send message to external service
    async function sendMessageToMake(message) {
        const webhookURL = 'https://hook.eu2.make.com/o7saj7j0sr2xt4ny3aofuvbfw2q5fevv';  // Replace with actual webhook
    
        try {
            // Create a new message container for "Thinking..."
            const thinkingMessage = document.createElement('div');
            thinkingMessage.className = 'message bot thinking-message';
            thinkingMessage.innerHTML = "...";
    
            chatMessages.appendChild(thinkingMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
    
            // Start typing animation using TypewriterJS library
            const typewriter = new Typewriter(thinkingMessage, {
                loop: true,
                delay: 150, 
                cursor: ''
            });
    
            typewriter.typeString("...")
                .start();
    
            // Fetch the response from the webhook
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
    
            const responseText = await response.text();  // Get response as plain text first
    
            try {
                const data = JSON.parse(responseText);  // Try to parse it as JSON
                if (data.response) {
                    setTimeout(() => {
                        thinkingMessage.remove();
                        // Display the bot's response
                        displayMessage(data.response, 'bot')
                    }, 2000);  // Wait for 2 seconds before displaying the responsense
                    
                } else {
                    console.error('Response does not contain "response" field');
                }
            } catch (jsonError) {
                console.error('Error parsing response as JSON:', jsonError);
                // Handle the non-JSON response accordingly, e.g., display the raw message
                setTimeout(() => {
                    thinkingMessage.remove();
                    displayMessage(responseText, 'bot');
                }, 2000);  // Wait for 2 seconds before displaying the raw message
            }
        } catch (error) {
            console.error('Error:', error);
            // In case of error, remove the "Thinking..." message and show a default error message
            thinkingMessage.remove();
            displayMessage("Sorry, there was an error processing your request.", 'bot');
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
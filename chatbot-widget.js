
window.initChatbot = function initChatbot(config = {}) {
    if (window.chatbotInitialized) return;
    window.chatbotInitialized = true;
    const {
        botName = config.botName || 'X',
        assistantTitle = config.assistantTitle || 'AI Assistent - X',
        greetingHTML = config.greetingHTML || `
        <div style="display: flex; align-items: center; font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif; color: #333; line-height: 1.6; font-size: 16px;">
         <div>
           <p style="margin-bottom: 15px;">Hei og velkommen!</p>
           <p style="margin-bottom: 15px;">Jeg er en AI-assistent fra <strong>Mustafa Chatbots</strong>.</p>
           <p style="margin-bottom: 15px;">Vi lager skreddersydde chatbots som hjelper bedrifter med kundeservice og salg – døgnet rundt.</p>
           <p style="margin-bottom: 15px;">Ta gjerne kontakt på 
             <a href="mailto:kundeservice@Mustafa.no" style="color: #1a73e8; text-decoration: none;">kundeservice@Mustafa.no</a> hvis du vil vite mer.
           </p>
           <p style="font-size: 15px; font-weight: bold; color: #333; margin-top: 15px;">Hva vil du teste i dag?</p>
         </div>
        </div>`,
        webhookURL = config.webhookURL || 'https://hook.eu2.make.com/o7saj7j0sr2xt4ny3aofuvbfw2q5fevv',
        logoSrc = config.logoSrc || 'Images/Mustafa.png',
        buttonColor = config.buttonColor || '#A0430A',
        buttonHoverColor = config.buttonHoverColor || '#8C3708',
        customBackgroundColor = config.customBackgroundColor || '#f9f9f9',
        MobileChatHeight = config.MobileChatHeight || '570px'
    } = config;

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
    chatbotButton.style.backgroundColor = buttonColor;
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
        chatbotButton.style.backgroundColor = buttonHoverColor; //lighter colour
    });

    chatbotButton.addEventListener('mouseout', () => {
        chatbotButton.style.backgroundColor = buttonColor;  // darker colour
    });

    // Append the button to the document body directly
    document.body.appendChild(chatbotButton);
    
    
    // Create a container for the shadow DOM and attach a shadow root
    const shadowHost = document.createElement('div');
    document.body.appendChild(shadowHost);

    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.007;  // 1% of the viewport height
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    

    const shadowRoot = shadowHost.attachShadow({
        mode: 'open'
    });

    // Inject the CSS styles into the shadow DOM
    const style = document.createElement('style');
    style.textContent = `
/* Chatbot container with solid border */
#chatbot-container {
    position: fixed;
    bottom: 40px;
    right: 20px;
    width: 380px;
    min-height: 40vh;
    max-height: 90vh;
    display: none;
    z-index: 9999;
    border-radius: 10px;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif;
    border: 2px solid #ccc;
    color: #333
}

/* Chatbot button */
#chatbot-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: ${buttonColor};
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
    background-color: ${buttonHoverColor};
}

/* Navbar styling */
#chatbot-navbar {
    background-color: ${buttonHoverColor};
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
    line-height: 1.5; /* Increased line height */
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
    background-color: ${buttonColor};
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
    background-color: ${buttonColor};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#chatbot-container .input-box button:hover {
    background-color: ${buttonHoverColor};
}

/* Responsive Design for Mobile */
@media (max-width: 767px) {
    /* Chatbot button at the bottom */
    #chatbot-button {
        bottom: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        font-size: 20px;
        border-radius: 50%;
        background-color: ${buttonHoverColor};
        color: white;
        text-align: center;
        position: sticky;
        z-index: 9999; /* Ensure it's always on top */
        
    }

    /* Chatbot container */
    #chatbot-container {
        position: fixed;
        bottom: 0px;
        right: 0px;
        width: 100%;
        min-height:${MobileChatHeight};
        max-width: 350px;
        background-color: white;
        overflow: hidden;
        display: none;
        flex-direction: column;
        transition: all 0.3s ease; /* Smooth transition */
    }

    /* Chat messages container */
    #chat-messages {
        padding: 10px;
        overflow-y: auto;
        flex-grow: 1
    }

    /* Input box styling */
    #chatbot-container .input-box {
        padding: 8px;
        background-color: #f1f1f1;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;  /* Prevent shrinking */
        margin-top: auto
    }

    #chatbot-container .input-box input {
        font-size: 14px;
        width: 85%; /* Ensure the input is not too wide */
        padding: 8px;
        border-radius: 5px;

    }

    #chatbot-container .input-box button {
        font-size: 14px;
        padding: 8px;
        border-radius: 5px;
        background-color: ${buttonHoverColor};
        color: white;
    }

    /* Navbar styling */
    #chatbot-navbar {
        flex-shrink: 0;
        font-size: 16px;
        padding: 8px;
        position: relative;
        background-color: ${buttonHoverColor};
        color: white;
        
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
    logo.src = logoSrc; // Replace with your logo
    navbar.appendChild(logo);

    const title = document.createElement('span');
    title.textContent = botName;
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

        // Add event listener to minimize when clicking outside the chatbot
        document.addEventListener('click', (event) => {
            // If click is outside the chatbot container and the floating button, minimize the chatbot
            if (!chatbotContainer.contains(event.target) && !chatbotButton.contains(event.target)) {
                chatbotContainer.style.display = 'none';  // Hide the chatbot
                chatbotButton.style.display = 'flex';     // Show the floating button again
            }
        });
    
        // Prevent the event listener on 'document' from firing if the click was inside the chatbot
        chatbotContainer.addEventListener('click', (event) => {
            event.stopPropagation(); // This prevents the click event from propagating to the document
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
    infoLogo.src = logoSrc;
    infoLogo.id = 'info-logo';
    infoContainer.appendChild(infoLogo);

    // Create the info message inside the container
    const infoMessage = document.createElement('p');
    infoMessage.textContent = assistantTitle;
    infoContainer.appendChild(infoMessage);

    // Style the infoContainer
    infoContainer.style.textAlign = 'center';
    infoContainer.style.padding = '10px';

    // Style the logo inside the infoContainer
    infoLogo.style.display = 'block';
    infoLogo.style.margin = '0 auto';
    infoLogo.style.width = '50px';
    infoLogo.style.height = '50px';
    infoLogo.style.borderRadius = '50%'

    // Style the text inside the infoContainer
    infoMessage.style.fontWeight = 'bold';
    infoMessage.style.marginTop = '10px';
    infoMessage.style.color = '#333';
    infoMessage.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", sans-serif';

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
    const backgroundColor = customBackgroundColor; // Adjust this as needed (light background color)

    // Set background color for chatbot container
    chatbotContainer.style.backgroundColor = backgroundColor;  
    
    
    // Toggle chatbot visibility
    chatbotButton.addEventListener('click', () => {
    if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
        chatbotContainer.style.display = 'block';
        chatbotButton.style.display = 'none';  // Hide the floating button when the UI is open
        if (!greetingShown) {
            // Display formatted greeting message inside the message container
            displayMessage(greetingHTML, 'bot');
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
    
        // Only check scroll behavior after the first message
        if (greetingShown) {
            // Ensure that the container fits the content until it overflows
            chatMessages.style.overflowY = 'auto'; // Enable scroll if necessary
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the latest message
        } else {
            // On first greeting, make sure overflow is hidden
            chatMessages.style.overflowY = 'hidden';
        }
        
        // Check if the content has grown beyond the container height
        if (chatMessages.scrollHeight > chatMessages.clientHeight) {
            chatMessages.style.overflowY = 'auto'; // Enable scroll if overflow occurs
        }
    }
    
    // Send message to external service
    async function sendMessageToMake(message) {
        try {
            // Create a new message container for "Thinking..."
            const thinkingMessage = document.createElement('div');
            thinkingMessage.className = 'message bot thinking-message';
            thinkingMessage.innerHTML = "";
        
            chatMessages.appendChild(thinkingMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        
            const states = ['', '.', '..', '...', '....']; // Define the states: ['...', '..', '.', '']
            let currentStateIndex = 0; // Start at the first state: '...'
            let direction = 1; // 1 means moving forward, -1 means moving backward
                
            const typingInterval = setInterval(() => {
                thinkingMessage.innerHTML = states[currentStateIndex]; // Update the message with the current state
            
                // Update the currentStateIndex based on the direction
                currentStateIndex += direction;
            
                // If we've reached the end of the states array, reverse the direction
                if (currentStateIndex === states.length) {
                    direction = -1; // Move backward
                    currentStateIndex = states.length - 2; // Start moving backwards from the second-to-last state
                } else if (currentStateIndex < 0) {
                    direction = 1; // Move forward
                    currentStateIndex = 1; // Start moving forwards from the second state
                }
            }, 150);

            // Fetch the response from the webhook
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_message: message })
            });

            if (!response.ok) {
                console.error(`Error: HTTP status ${response.status}`);
                clearInterval(typingInterval);
                thinkingMessage.remove();
                displayMessage("Sorry, there was an error fetching the response.", 'bot');
                return;
            }

            const responseText = await response.text();

            try {
                const data = JSON.parse(responseText);
                if (data.response) {
                    setTimeout(() => {
                        clearInterval(typingInterval);
                        thinkingMessage.remove();
                        displayMessage(data.response, 'bot');
                    }, 2000);
                } else {
                    console.error('Response does not contain "response" field');
                    clearInterval(typingInterval);
                    thinkingMessage.remove();
                    displayMessage("Sorry, the response format was unexpected.", 'bot');
                }
            } catch (jsonError) {
                console.error('Error parsing response as JSON:', jsonError);
                setTimeout(() => {
                    clearInterval(typingInterval);
                    thinkingMessage.remove();
                    displayMessage(responseText, 'bot');
                }, 2000);
            }

        } catch (error) {
            console.error('Error:', error);
            clearInterval(typingInterval);
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
};
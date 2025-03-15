(function() {
    // Create the floating button for the chatbot
    const chatbotButton = document.createElement('div');
    chatbotButton.id = 'chatbot-button';
    chatbotButton.innerHTML = '🗨️';
    const logo = document.createElement('img');
    document.body.appendChild(chatbotButton);

    // Create the chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    document.body.appendChild(chatbotContainer);

    // Create navbar for chatbot with logo and title
    const navbar = document.createElement('div');
    navbar.id = 'chatbot-navbar';

    // Add logo to the navbar
    logo.src = 'https://firebasestorage.googleapis.com/v0/b/voiceglow-cdn/o/public%2F90l23re6_.png?alt=media'; // Replace with your logo
    navbar.appendChild(logo);

    // Add title to the navbar
    const title = document.createElement('span');
    title.textContent = 'Mustafa - AI Assistent';
    navbar.appendChild(title);

    chatbotContainer.appendChild(navbar);

    // Create message container and move infoContainer into it
    const chatMessages = document.createElement('div');
    chatMessages.id = 'chat-messages';
    chatbotContainer.appendChild(chatMessages);

    // Create the infoContainer that will be part of the chat scroll
    const infoContainer = document.createElement('div');
    infoContainer.id = 'info-container';
    chatMessages.appendChild(infoContainer); // Add it to chatMessages so it scrolls

    // Create logo for the info container
    const infoLogo = document.createElement('img');
    infoLogo.src = 'https://firebasestorage.googleapis.com/v0/b/voiceglow-cdn/o/public%2Fnew_logo_example.png?alt=media'; // Same or different logo as above
    infoLogo.id = 'info-logo';
    infoContainer.appendChild(infoLogo);

    // Create the info message inside the container
    const infoMessage = document.createElement('p');
    infoMessage.textContent = 'Mustafa - AI Assistent';
    infoContainer.appendChild(infoMessage);

    // Style the infoContainer
    infoContainer.style.textAlign = 'center'; // Center the content
    infoContainer.style.padding = '10px'; // Optional: Add padding to make the space more visible
   

    // Style the logo inside the infoContainer
    infoLogo.style.display = 'block';
    infoLogo.style.margin = '0 auto'; // Center the logo horizontally
    infoLogo.style.width = '50px'; // Adjust the width to make the logo smaller
    infoLogo.style.height = 'auto'; // Maintain aspect ratio

    // Style the text inside the infoContainer
    infoMessage.style.fontWeight = 'bold'; // Make the text bold
    infoMessage.style.marginTop = '10px'; // Add some margin above the text

    // Set height, max-height, and overflow for chat messages to ensure scrollability
    chatMessages.style.minHeight = '200px'; // Minimum height for the chatbox (you can adjust this value)
    chatMessages.style.maxHeight = '400px'; // Maximum height for the chatbox
    chatMessages.style.overflowY = 'hidden'; // Initially hide the scrollbar
    chatMessages.style.padding = '10px'; // Optional: Add padding for better spacing
    chatMessages.style.transition = 'max-height 0.3s ease-in-out'; // Smooth transition for height change

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

    // Dynamic border color based on background color
    function getContrastColor(hexColor) {
        // Convert hex to RGB
        const rgb = hexColor.replace('#', '');
        const r = parseInt(rgb.substr(0, 2), 16);
        const g = parseInt(rgb.substr(2, 2), 16);
        const b = parseInt(rgb.substr(4, 2), 16);
        
        // Calculate brightness using luminance formula
        const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        
        // Return a contrasting color (black or white based on brightness)
        return brightness > 128 ? '#000000' : '#FFFFFF'; // Black or white contrast
    }

    // Set dynamic border color based on background color
    const borderColor = getContrastColor(backgroundColor);
    chatbotContainer.style.border = `1px solid ${borderColor}`;

    // Toggle chatbot visibility
    chatbotButton.addEventListener('click', () => {
        if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
            chatbotContainer.style.display = 'block';
            if (!greetingShown) {
                // Display formatted greeting message inside the message container
                displayMessage(`
                    <div style="display: flex; align-items: center;">
                        <div>
                            <p><strong>Hei!</strong> Jeg er <strong>Mustafa</strong> sin AI assistent.</p>
                            <p>Jeg kan svare på spørsmål om våre sentre, åpningstider, medlemskap og andre relevante spørsmål om oss.</p>
                            <p>Du kan alltid kontakte oss direkte på <a href="mailto:kundeservice@Mustafa.no">kundeservice@Mustafa.no</a>.</p>
                            <p><strong>Hva kan jeg hjelpe deg med?</strong></p>
                        </div>
                    </div>
                `, 'bot');
                greetingShown = true; // Prevent showing greeting message again
            }
        } else {
            chatbotContainer.style.display = 'none';
        }
    });
    
    
    
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

    // Handle send button click
    function sendMessage() {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');  // Display user's message
            userMessageInput.value = ''; // Clear input
            sendMessageToMake(userMessage);
        }
    }

    // Send message to external service
   // Send message to external service
   async function sendMessageToMake(message) {
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

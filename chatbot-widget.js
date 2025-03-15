(function() {
    // Create a style element for custom styles
    const style = document.createElement('style');
    style.innerHTML = `
        /* General Layout */
        #chatbot-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: #007BFF;
            color: white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 24px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            z-index: 999;
            transition: background-color 0.3s ease;
        }

        #chatbot-button:hover {
            background-color: #0056b3;
        }

        /* Chatbot container with solid border */
        #chatbot-container {
            position: fixed;
            bottom: 80px;
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
            border: 3px solid #007BFF;
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
            max-height: calc(100% - 140px);
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
            background-color: #007BFF;
            color: white;
            border: none;
            padding: 10px;
            width: 50px;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s ease;
            margin-left: 10px;
        }

        #chatbot-container .input-box button:hover {
            background-color: #0056b3;
        }

        #chatbot-container .input-box input:focus {
            outline: none;
            border-color: #007BFF;
        }

        /* Ensure that no parent page CSS overrides */
        * {
            box-sizing: border-box;
        }
    `;
    document.head.appendChild(style);

    // Create the floating button for the chatbot
    const chatbotButton = document.createElement('div');
    chatbotButton.id = 'chatbot-button';
    chatbotButton.innerHTML = '🗨️';
    document.body.appendChild(chatbotButton);

    // Create the chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    document.body.appendChild(chatbotContainer);

    // Create navbar for chatbot with logo and title
    const navbar = document.createElement('div');
    navbar.id = 'chatbot-navbar';

    // Add logo to the navbar
    const logo = document.createElement('img');
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
    infoLogo.style.display = 'block';
    infoLogo.style.margin = '0 auto'; // Center the logo horizontally
    infoLogo.style.width = '50px'; // Adjust the width to make the logo smaller
    infoLogo.style.height = 'auto'; // Maintain aspect ratio
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

    // Toggle chatbot visibility
    chatbotButton.addEventListener('click', () => {
        if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
            chatbotContainer.style.display = 'block';
            if (!greetingShown) {
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

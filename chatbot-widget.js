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

    // Create the chatbot container that holds the iframe
    var chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.style.position = 'fixed';
    chatbotContainer.style.bottom = '20px';
    chatbotContainer.style.right = '20px';
    chatbotContainer.style.width = '400px';
    chatbotContainer.style.height = '600px';
    chatbotContainer.style.display = 'none';  // Initially hidden
    chatbotContainer.style.zIndex = '9999';
    chatbotContainer.style.border = '2px solid #ccc';
    chatbotContainer.style.borderRadius = '8px';

    // Create an iframe to embed the chatbot UI (connected to Make)
    var iframe = document.createElement('iframe');
    iframe.src = 'https://your-chatbot-url.com';  // Replace with your chatbot URL (connected to Make)
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = 'none';
    chatbotContainer.appendChild(iframe);
    document.body.appendChild(chatbotContainer);

    // Toggle the visibility of the chatbot when the button is clicked
    chatbotButton.addEventListener('click', function() {
        if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
            chatbotContainer.style.display = 'block';
        } else {
            chatbotContainer.style.display = 'none';
        }
    });
})();

document.addEventListener('DOMContentLoaded', function () {
  const userInput = document.querySelector('#user-input');
  const sendButton = document.querySelector('#send-button');
  const chatContainer = document.querySelector('#chat-container');

  // Listen for Enter key press
  userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  });

  // Listen for button click
  sendButton.addEventListener('click', handleUserInput);

  async function handleUserInput() {
    const message = userInput.value.trim();
    if (!message) return; // Do not send empty messages

    // Display the user's message
    displayMessage(message, true);

    // Clear the input field
    userInput.value = '';

    try {
      const response = await fetch('https://deepseekaichatbot.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), // Send the message in the body
      });

      // Read the response body as text first
      const responseText = await response.text(); 
      console.log(responseText);  // Log the raw response text

      // Now parse the text into JSON
      const data = JSON.parse(responseText); 
      const botReply = data.reply;

      // Display the bot's reply
      displayMessage(botReply, false);
    } catch (error) {
      console.error('Error:', error);
      displayMessage('Sorry, something went wrong.', false);
    }
  }

  function displayMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    const label = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user-message' : 'ai-message');
    label.classList.add(isUser ? 'user-label' : 'ai-label');
    label.textContent = isUser ? 'You: ' : 'AI: ';
    messageDiv.appendChild(label);
    messageDiv.appendChild(document.createTextNode(message));
    chatContainer.appendChild(messageDiv);

    // Scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
});

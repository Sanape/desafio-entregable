const socketClient = io();
let messages = [];
let error = '';
const chat = document.getElementById('chat');
const clearBtn = document.getElementById('clearBtn');

socketClient.emit('getMessages');

socketClient.on('newMessages', (_messages) => {
  messages = [..._messages];
  compileChat();
});

const messageForm = document.getElementById('messageForm');

messageForm.onsubmit = async (e) => {
  e.preventDefault();

  let newMessage = {
    user: document.getElementById('email').value,
    messageText: document.getElementById('message').value,
  };

  if (validMessage(newMessage)) {
    socketClient.emit('messageSent', newMessage);
    // Clear the input fields
    //document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  }
};

function validMessage(_message) {
  return _message.user && _message.messageText;
}

function compileChat() {
  const chatTemplate = messages
    .map((_message) => `<li>${_message.user}: ${_message.messageText}</li>`)
    .join(' ');
  chat.innerHTML = chatTemplate;
}

clearBtn.addEventListener('click', () => {
  socketClient.emit('clearChat');
});

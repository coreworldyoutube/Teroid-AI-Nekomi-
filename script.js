async function sendMessage() {
  const inputElem = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userText = inputElem.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');

  // fetchを待って結果を受け取る
  const botReply = await toMachineSpeak(userText);

  addMessage(botReply, 'bot');

  inputElem.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addMessage(text, sender) {
  const chatBox = document.getElementById('chat-box');
  const p = document.createElement('p');
  p.classList.add('message');
  if (sender === 'user') {
    p.classList.add('user');
    p.textContent = `あなた: ${text}`;
  } else {
    p.classList.add('bot');
    p.textContent = `Teroid: ${text}`;
  }
  chatBox.appendChild(p);
}

function toMachineSpeak(text) {
  return fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: text })
  })
  .then(res => res.json())
  .then(data => data.reply)
  .catch(err => "エラーが発生しました");
}
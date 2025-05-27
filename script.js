const learningData = {
  "こんにちは": ["やあ！", "こんにちは〜", "こんちゃ！"],
  "元気": ["元気だよ！", "まあまあかな", "疲れた〜"],
  "好きな食べ物": ["ラーメン！", "寿司！", "チョコ！"]
};

async function sendMessage() {
  const inputElem = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userText = inputElem.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');

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
  const keys = Object.keys(learningData);
  for (let key of keys) {
    if (text.includes(key)) {
      const responses = learningData[key];
      const randIndex = Math.floor(Math.random() * responses.length);
      return Promise.resolve(responses[randIndex]);
    }
  }
  return Promise.resolve("うーん、よくわからないにゃ");
}
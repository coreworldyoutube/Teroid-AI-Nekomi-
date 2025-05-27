let learningData = {}; // 空オブジェクトで初期化

async function loadLearningData() {
  try {
    const res = await fetch('data.json');  // JSONファイルを読み込み
    learningData = await res.json();                // 解析して代入
    console.log('学習データ読み込み完了', learningData);
  } catch (e) {
    console.error('学習データ読み込み失敗', e);
    // 読み込み失敗時の保険的な最低限のデータ
    learningData = {
      "こんにちは": ["やあ！", "こんにちは〜", "こんちゃ！"]
    };
  }
}

// ページが読み込まれたら学習データをロードする
window.addEventListener('load', () => {
  loadLearningData();
});

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
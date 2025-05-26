function sendMessage() {
  const inputElem = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userText = inputElem.value.trim();
  if (!userText) return;

  // ユーザーメッセージをチャットボックスに追加（userクラスで色分け）
  addMessage(userText, 'user');

  // 擬似AIの返答を生成
  const botReply = toMachineSpeak(userText);

  // ボットメッセージをチャットボックスに追加（botクラスで色分け）
  addMessage(botReply, 'bot');

  // 入力欄をクリアしてスクロールを一番下へ
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
  // ここで機械語風に変換（例: 大文字にしてビープボップを付加）
  return `BEEP-BOOP: [${text.toUpperCase()}]`;
}
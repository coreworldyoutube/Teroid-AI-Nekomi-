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
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    user_text = request.json.get("message", "")
    response = f"Pythonからの返事: {user_text[::-1]}"  # 例：逆にするだけ
    return jsonify({"reply": response})

if __name__ == "__main__":
    app.run(debug=True)
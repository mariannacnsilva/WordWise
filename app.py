from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS (app)

@app.route('/')
def index():
  return "Backend is running!"

@app.route('/api/data', methods=['GET'])
def get_data():
  data = {"message": "Dados recebidos com sucesso!"}
  return jsonify(data)

@app.route('/enviar-questionario', methods=['POST'])
def post_questionario():
  data = request.json

  #respostas = data.get('respostas', [])
  respostas = {
    "titleText": "Exploring the World Through Travel and Conversation.",
    "text": ("Traveling is one of the most enriching experiences you can have. At 25, you’ve likely already seen "
             "a few places, but the world is vast and full of wonders waiting to be explored. As someone with"
             " intermediate English skills, you’re already equipped to navigate through many countries where "
             "English is spoken. However, to truly immerse yourself in different cultures, enhancing your "
             "conversation skills will be crucial. Imagine you’re in a bustling market in Bangkok, trying to "
             "bargain for a unique souvenir. The ability to converse fluently in English could help you not only "
             "get the best price but also learn the story behind that item, perhaps even making a new friend along "
             "the way. Or picture yourself in Paris, striking up a conversation with fellow travelers at a café."
             " Good conversation skills can turn a simple chat into a deep exchange of ideas and experiences. To "
             "improve your English for these situations, focus on practicing dialogues related to travel. Think"
             " about scenarios like asking for directions, checking into a hotel, or discussing travel plans with "
             "other tourists. Engage in conversations that challenge your vocabulary and force you to think on your"
             " feet. The more you practice, the more natural these interactions will become. In summary, as you "
             "continue your journey to improve your English, remember that every conversation is a step closer to "
             "mastering the language. With your passion for travel, each new interaction will not only enhance your"
             " language skills but also deepen your understanding of the world."),
    "question": "Why is enhancing conversation skills important for someone who enjoys traveling?"
  }
  response = {"respostas": respostas}
  return jsonify(response)

@app.route('/enviar-resposta', methods=['POST'])
def post_resposta():
  data = request.json

  retorno = {"return": "Great! Your hit percentage was 100%."}
  response = {"respostas": retorno}
  return jsonify(response)

if __name__ == '__main__':
  app.run(debug=True)

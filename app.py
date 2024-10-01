from flask import Flask, jsonify, request
import requests, os
from flask_cors import CORS

app = Flask(__name__)
CORS (app)

class Aluno:
  def __init__(self, nome: str, idade: str, interesses: str, habilidade: str, habilidades_atuais: list) -> None:
    self.nome: str = nome
    self.idade: str = idade
    self.interesses: str = interesses
    self.habilidade: str = habilidade
    self.habilidades_atuais: list = habilidades_atuais

@app.route('/')
def index():
  return "Backend is running!"

@app.route('/enviar-questionario', methods=['POST'])
def post_questionario():
  data = request.json
  '''res = data.get('respostas', [])

  aluno = Aluno(res['name'], res['age'], res['interests'], res['ability'], res['currentAbilities'])
  prompt = f'Imagine que você é um professor de inglês e escreverá uma questão para um alunx que se chama {aluno.nome}, de {aluno.age} anos, que se interessa por {aluno.interests}, deseja focar em aprender {aluno.ability} e já domina {aluno.currentAbilities}.'

  LIGAR COM GPT e passar o prompt

  response = {'question': 'retorno do gpt'}

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
  }'''
  response = {"respostas": data.get('respostas', [])}
  return jsonify(response)

@app.route('/enviar-resposta', methods=['POST'])
def post_resposta():
  data = request.json

  prompt1 = ''

  retorno = {"return": "Great! Your hit percentage was 100%."}
  response = {"respostas": retorno}
  return jsonify(response)

  def gpt_request() -> dict:
    # Content
    link = "https://api.openai.com/v1/chat/completions"
    modelId = "gpt-4o-mini"
    maxTokens = 220
    messages= [
        {"role": "system", "content": "Say that this is a test"}
    ]
    TOKEN = ''

    # Requisition
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    }
    body = {
        "model": modelId,
        "messages": messages,
        "max_tokens": maxTokens,
    }

    bodyMessage = json.dumps(body)
    request = requests.post(link, headers=headers, data=bodyMessage)

    print(request)
    print(request.content)

if __name__ == '__main__':
  app.run(debug=True)

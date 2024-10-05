from flask import Flask, jsonify, request
import requests, json, os
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)
CORS (app)
aluno = None
load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')

class Aluno:
  def __init__(self, nome: str, idade: str, interesses: str, habilidade: str, habilidades_atuais: list) -> None:
    self.nome: str = nome
    self.idade: str = idade
    self.interesses: str = interesses
    self.habilidade: str = habilidade
    self.habilidades_atuais: list = habilidades_atuais
    self.gpt: dict = {
      'introdução': '',
      'exercício': '',
      'resposta': ''
    }

@app.route('/')
def index():
    return "Backend is running!"

@app.route('/enviar-questionario', methods=['POST'])
def post_questionario():
    global aluno

    # Recebendo dados
    data = request.json
    res = data.get('respostas', [])
    aluno = Aluno(res['name'], res['age'], res['interests'], res['ability'], res['currentAbilities'])

    # Enviando requisição
    aluno.gpt['introdução'] = f'Imagine que você é um professor de inglês e escreverá uma questão para um alunx que se chama {aluno.nome}, de {aluno.idade} anos, que se interessa por {aluno.interesses}, deseja focar em aprender {aluno.habilidade} e já domina {aluno.habilidades_atuais}.'
    prompt = 'Com base nesse aluno, escreva uma história em inglês referente ao perfil do usuário para ensino de inglês e formule uma questão sobre esse texto de forma que o aluno possa responder com suas palavras. O formato da resposta deve ser um json com os campos: "titleText", "text", and "question" (o conteúdo é apenas um exemplo):\
          {\
            "titleText": "Exploring the World Through Travel and Conversation.",\
            "text": "Traveling is one of the most enriching experiences you can have. At 25, you’ve likely already seen a few places, but the world is vast and full of wonders waiting to be explored...",\
            "question": "Why is enhancing conversation skills important for someone who enjoys traveling?"\
          }'
    content = aluno.gpt['introdução'] + prompt

    response = gpt_request(content)
    texto_recebido = response.replace('```json', '').replace('```', '').strip()
    texto_recebido_tratado = texto_recebido.replace("\n", "").replace("  ", " ")

    print(texto_recebido_tratado)
    return texto_recebido_tratado

@app.route('/enviar-resposta', methods=['POST'])
def post_resposta():
    data = request.json
    res = data.get('response', [])

    aluno.gpt['resposta'] = res
    prompt = f''' Imagine que você é um professor de inglês e analise o texto a seguir e a resposta do aluno para este texto. Após isso, informe um feedback com base no objetivo do aluno, {aluno.habilidade}, em formato de texto contendo a porcentagem de acertos e os pontos onde esse aluno poderia melhorar. Essa resposta deve estar contida em 'return'. Além disso, com base nesse aluno, escreva uma história em inglês, referente ao perfil do usuário e resposta da pergunta anterior, para ensino de inglês e formule uma questão sobre esse texto de forma que o aluno possa responder com suas palavras. O formato da resposta deve ser um json com os campos: "titleText", "text", "question" and "return". Texto:'''

    content = aluno.gpt['introdução'] + prompt + aluno.gpt['exercício'] + ' Resposta do usuário: ' + aluno.gpt['resposta']

    response = gpt_request(content)
    texto_recebido = response.replace('```json', '').replace('```', '').strip()
    texto_recebido_tratado = texto_recebido.replace("\n", "").replace("  ", " ")

    print("enviar-resposta retorno:", texto_recebido_tratado)
    return texto_recebido_tratado

def gpt_request(prompt: str):
    # Content
    link = "https://api.openai.com/v1/chat/completions"
    modelId = "gpt-4o-mini"
    maxTokens = 220
    messages= [
        {"role": "user", "content": prompt}
    ]
    TOKEN = openai_api_key

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
    response = requests.post(link, headers=headers, data=bodyMessage)

    json_response = response.json()

    # Verificando se 'choices' existe na resposta
    if 'choices' in json_response and len(json_response['choices']) > 0:
        # Retornando o conteúdo correto
        return json_response['choices'][0]['message']['content']

    else:
        print("A resposta não contém o formato esperado.")
        return None

if __name__ == '__main__':
    app.run(debug=True)

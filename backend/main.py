import requests
import pypdfium2 as pdfium
import re
from flask import Flask, jsonify
from gevent.pywsgi import WSGIServer

response = requests.get('https://www.ceec.edu.tw/SourceUse/ce37/5.pdf')

with open('word_bank.pdf', 'wb') as file:
    file.write(response.content)

vocabulary_by_level = {}
for i in range(1, 7):
    vocabulary_by_level[i] = []

pdf = pdfium.PdfDocument("word_bank.pdf")

for i in range(len(pdf)):
    page = pdf[i]
    text = page.get_textpage().get_text_range()
    level_match = re.search(r'LEVEL (\d+)', text)

    if not level_match:
        continue

    level_number = int(level_match.group(1))
    lines = text.split('\n')

    for line in lines:
        if 'LEVEL' in line:
            continue

        line = re.sub(r'[^A-Za-z/ \.]', '', line)
        if line == '':
            continue

        words = [*line.split('/')]
        for word in words:
            word = word.strip()
            if word == '':
                continue

            vocabulary_by_level[level_number].append(word)

app = Flask(__name__)

@app.route('/word_bank', methods=['GET'])
def word_bank():
    response = jsonify(vocabulary_by_level)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    http_server = WSGIServer(('', 22034), app)
    http_server.serve_forever()

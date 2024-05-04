from flask import Flask, request, jsonify
#from flask_cors import CORS
import nltk
import string
import heapq
import re

app = Flask(__name__)
# CORS(app)

nltk.download('punkt')

stopwords = set(['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"])

def preprocess(text):
    cleaned_text = re.sub(r'\+\s*|\n\s*', '', text)
    cleaned_text = re.sub(r"'|\"", '', cleaned_text)
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text)

    formatted_text = cleaned_text.lower()
    tokens = [word for word in nltk.word_tokenize(formatted_text) if word not in stopwords and word not in string.punctuation]
    formatted_text = ' '.join(tokens)
    return formatted_text

def summarize_text(text, percentage):
    summary = ""
    original_text = text
    formatted_text = preprocess(original_text)

    word_frequency = nltk.FreqDist(nltk.word_tokenize(formatted_text))
    highest_frequency = max(word_frequency.values())
    for word in word_frequency.keys():
        word_frequency[word] = (word_frequency[word] / highest_frequency)

    sentence_list = nltk.sent_tokenize(original_text)

    score_sentences = {}
    for sentence in sentence_list:
        for word in nltk.word_tokenize(sentence.lower()):
            if sentence not in score_sentences:
                score_sentences[sentence] = word_frequency[word]
            else:
                score_sentences[sentence] += word_frequency[word]

    best_sentences = heapq.nlargest(int(len(sentence_list) * percentage), score_sentences, key=lambda sentence: score_sentences.get(sentence, 0))

    for sentence in sentence_list:
        if sentence in best_sentences:
            summary += ' ' + sentence

    return summary

@app.route('/summarize', methods=['POST'])
def summarize_endpoint():
    json_data = request.json
    if json_data:    
        data = json_data.get('data')
        #print(data)
        percentage = json_data.get('percentage')
        #print(percentage)
        summarized_text = summarize_text(data, percentage)
        return jsonify({'summary': summarized_text})
    else:
        return jsonify({'error': 'Missing data parameter'}), 400

if __name__ == '__main__':
    app.run(port=5000)
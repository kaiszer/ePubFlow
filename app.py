from flask import Flask, render_template, request, send_file, after_this_request
import os
import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup
import re

app = Flask(__name__)

def make_first_letters_bold(text):
    def replace(match):
        word = match.group(0)
        if len(word) == 2:
            return f"<b>{word[0]}</b>{word[1]}"
        return f"<b>{match.group(1)}</b>{match.group(2)}"

    formatted_text = re.sub(r"(\b\w{2})(\w*)", replace, text)
    
    return formatted_text

def process_epub(input_path, output_path):
    book = epub.read_epub(input_path)

    for item in book.get_items():
        if isinstance(item, ebooklib.epub.EpubHtml):
            html_content = item.get_body_content().decode()
            soup = BeautifulSoup(html_content, "html.parser")

            for element in soup.find_all(text=True):
                if element.parent.name not in ['style', 'script']:
                    formatted_text = make_first_letters_bold(element)
                    element.replace_with(BeautifulSoup(formatted_text, 'html.parser'))

            item.content = str(soup).encode('utf-8')

    epub.write_epub(output_path, book)
    print(f"Formatted EPUB saved to {output_path}")

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return "No file part"
        file = request.files['file']
        if file.filename == '':
            return "No selected file"
        if file and file.filename.endswith('.epub'):
            input_filename = file.filename
            input_path = os.path.join('/tmp', input_filename)
            base_name, ext = os.path.splitext(input_filename)
            output_filename = f"{base_name}_flow{ext}"
            output_path = os.path.join('/tmp', output_filename)
            file.save(input_path)
            process_epub(input_path, output_path)
            return render_template('download.html', output_file=output_filename, input_file=input_filename)
    return render_template('upload.html')

@app.route('/download/<filename>')
def download_file(filename):
    output_file_path = os.path.join('/tmp', filename)
    input_filename = request.args.get('input_file')
    input_file_path = os.path.join('/tmp', input_filename)

    @after_this_request
    def remove_files(response):
        try:
            os.remove(output_file_path)
            os.remove(input_file_path)
        except Exception as e:
            print(f"Error removing files {output_file_path} or {input_file_path}: {e}")
        return response

    return send_file(output_file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)

import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup
import re

def make_first_letters_bold(text):
    def replace(match):
        word = match.group(0)
        if len(word) == 2:
            return f"<b>{word[0]}</b>{word[1]}"
        return f"<b>{match.group(1)}</b>{match.group(2)}"

    # Use regex to find words and make the first 2 letters bold
    formatted_text = re.sub(r"(\b\w{2})(\w*)", replace, text)
    
    return formatted_text

def process_epub(input_path, output_path):
    book = epub.read_epub(input_path)

    for item in book.get_items():
        if isinstance(item, ebooklib.epub.EpubHtml):
            # Decode the HTML content
            html_content = item.get_body_content().decode()

            # Use Beautiful Soup to parse the HTML
            soup = BeautifulSoup(html_content, "html.parser")

            # Apply the formatting to the text while preserving the HTML structure
            for element in soup.find_all(text=True):
                if element.parent.name not in ['style', 'script']:
                    formatted_text = make_first_letters_bold(element)
                    element.replace_with(BeautifulSoup(formatted_text, 'html.parser'))

            # Update the item content
            item.content = str(soup).encode('utf-8')

    epub.write_epub(output_path, book)
    print(f"Formatted EPUB saved to {output_path}")

if __name__ == "__main__":
    input_epub = r"C:\Users\Kaisz\Documents\Epub\Cthulhu.epub"
    output_epub = r"C:\Users\Kaisz\Documents\Epub\bold\Cthulhu_output.epub"

    process_epub(input_epub, output_epub)

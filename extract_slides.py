import os
import sys
import re
try:
    import fitz
except ImportError:
    import pymupdf as fitz

data_file = 'js/data.js'
with open(data_file, 'r', encoding='utf-8') as f:
    content = f.read()

for i in range(1, 25):
    pdf_path = f"assets/cd04_presentation_{i}.pdf"
    if os.path.exists(pdf_path):
        doc = fitz.open(pdf_path)
        page = doc.load_page(0)
        pix = page.get_pixmap()
        img_path = f"assets/cd04_presentation_{i}_preview.jpg"
        pix.save(img_path)
        print(f"Saved {img_path}")
        
        pattern = re.compile(r'"preview_image":\s*"[^"]+",(\s*)"external_url":\s*"assets/cd04_presentation_' + str(i) + r'\.pdf"')
        replacement = f'"preview_image": "{img_path}",\\1"external_url": "{pdf_path}"'
        content = pattern.sub(replacement, content)

with open(data_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done updating data.js")

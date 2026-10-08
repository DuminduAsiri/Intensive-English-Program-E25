import os
try:
    import fitz
except ImportError:
    import pymupdf as fitz

for i in range(1, 10):
    pdf_path = f"assets/cd01_presentation_{i}.pdf"
    img_path = f"assets/cd01_presentation_{i}_preview.jpg"
    
    if os.path.exists(pdf_path):
        try:
            doc = fitz.open(pdf_path)
            page = doc.load_page(0)
            pix = page.get_pixmap()
            pix.save(img_path)
            print(f"Saved {img_path}")
        except Exception as e:
            print(f"Error processing {pdf_path}: {e}")
    else:
        print(f"File not found: {pdf_path}")

import json

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all "committee": "Project" with "committee": "Content"
content = content.replace('"committee": "Project"', '"committee": "Content"')

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Replaced successfully!')

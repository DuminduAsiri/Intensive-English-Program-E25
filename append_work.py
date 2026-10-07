import sys

path = 'c:/Users/dasam/Desktop/Intensive English Program E25/js/data.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

new_item = """    {
      "id": "cd04-creative-work-7",
      "group_id": "33170e6f-f850-4cb2-b300-5f97e6c31a88",
      "activity_id": "1370eefe-af82-4b20-a466-077df24ed8ba",
      "kind": "image",
      "title": "University: A New Chapter... Same Dreams...",
      "student_name": "M.Yuvaraj",
      "preview_image": "assets/cd04_creative_work_7.jpg",
      "external_url": "assets/cd04_creative_work_7.jpg",
      "description": "A heartfelt poem about learning, growing, and finding ourselves. It captures the essence of new beginnings, friendships, challenges, and dreams for the future.",
      "created_at": "2026-10-06T00:00:00Z"
    },
"""

content = content.replace('    {\n      "id": "cd04-creative-work-6"', new_item + '    {\n      "id": "cd04-creative-work-6"')
content = content.replace('    {\r\n      "id": "cd04-creative-work-6"', new_item.replace('\n', '\r\n') + '    {\r\n      "id": "cd04-creative-work-6"')

with open(path, 'w', encoding='utf-8', newline='') as f:
    f.write(content)

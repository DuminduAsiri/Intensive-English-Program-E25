import json, uuid

items = [
    {
      "id": str(uuid.uuid4()),
      "group_id": "87ddf96e-deea-4ebc-b2b8-64bb27480567",
      "activity_id": "1370eefe-af82-4b20-a466-077df24ed8ba",
      "kind": "image",
      "title": "A Matter of Perspective",
      "student_name": "Dilusha Sandaru",
      "preview_image": "assets/Dilusha Sandaru.jpg",
      "external_url": "assets/Dilusha Sandaru.jpg",
      "description": "A beautiful poem reminding us that how we see the world depends on where we stand. It teaches us to appreciate our own journey, be thankful for what we have, and find peace in our own light instead of comparing ourselves to others.",
      "created_at": "2026-10-07T00:00:00Z"
    },
    {
      "id": str(uuid.uuid4()),
      "group_id": "87ddf96e-deea-4ebc-b2b8-64bb27480567",
      "activity_id": "1370eefe-af82-4b20-a466-077df24ed8ba",
      "kind": "image",
      "title": "The Path to Success: Never Give Up",
      "student_name": "Prabhani",
      "preview_image": "assets/Prabhani.jpg",
      "external_url": "assets/Prabhani.jpg",
      "description": "A motivational essay about resilience and persistence. It encourages us to view failures as important lessons, reminding us that true success belongs to those who continue trying and keep learning.",
      "created_at": "2026-10-07T00:00:00Z"
    },
    {
      "id": str(uuid.uuid4()),
      "group_id": "87ddf96e-deea-4ebc-b2b8-64bb27480567",
      "activity_id": "1370eefe-af82-4b20-a466-077df24ed8ba",
      "kind": "image",
      "title": "A Tribute to Dad",
      "student_name": "Sandasiri",
      "preview_image": "assets/Sandasiri.jpg",
      "external_url": "assets/Sandasiri.jpg",
      "description": "A heartwarming short essay celebrating the special bond between a child and their father. It highlights a dad's love, protection, and willingness to always make time to bring laughter and joy into our lives.",
      "created_at": "2026-10-07T00:00:00Z"
    },
    {
      "id": str(uuid.uuid4()),
      "group_id": "87ddf96e-deea-4ebc-b2b8-64bb27480567",
      "activity_id": "1370eefe-af82-4b20-a466-077df24ed8ba",
      "kind": "image",
      "title": "The Precious Gift of Life",
      "student_name": "Sathruwanee",
      "preview_image": "assets/Sathruwanee.jpg",
      "external_url": "assets/Sathruwanee.jpg",
      "description": "A thoughtful reflection on the journey of life. It reminds us that life is full of learning opportunities and challenges that help us grow, emphasizing the importance of good health and positive thinking.",
      "created_at": "2026-10-07T00:00:00Z"
    },
    {
      "id": str(uuid.uuid4()),
      "group_id": "87ddf96e-deea-4ebc-b2b8-64bb27480567",
      "activity_id": "1370eefe-af82-4b20-a466-077df24ed8ba",
      "kind": "image",
      "title": "A Simple Story",
      "student_name": "Sayuru Fernando",
      "preview_image": "assets/Sayuru Fernando.jpg",
      "external_url": "assets/Sayuru Fernando.jpg",
      "description": "A short story about a kind and helpful boy named Ravi. It shares a simple but powerful moral: always be kind, helpful, and do your best in life.",
      "created_at": "2026-10-07T00:00:00Z"
    },
    {
      "id": str(uuid.uuid4()),
      "group_id": "87ddf96e-deea-4ebc-b2b8-64bb27480567",
      "activity_id": "1370eefe-af82-4b20-a466-077df24ed8ba",
      "kind": "image",
      "title": "The Power of Education: Happy Teacher's Day",
      "student_name": "Sineth Sanujaya",
      "preview_image": "assets/Sineth Sanujaya.jpg",
      "external_url": "assets/Sineth Sanujaya.jpg",
      "description": "An inspiring passage reflecting on Nelson Mandela's words about education being the most powerful weapon to change the world. It honors the vital role teachers play as the pillars of our society.",
      "created_at": "2026-10-07T00:00:00Z"
    }
]

result = []
for s in items:
    obj = f'''    {{
      "id": "{s["id"]}",
      "group_id": "{s["group_id"]}",
      "activity_id": "{s["activity_id"]}",
      "kind": "image",
      "title": "{s["title"]}",
      "student_name": "{s["student_name"]}",
      "preview_image": "{s["preview_image"]}",
      "external_url": "{s["external_url"]}",
      "description": "{s["description"]}",
      "created_at": "{s["created_at"]}"
    }}'''
    result.append(obj)

new_str = ',\n'.join(result) + ',\n'

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('"contentItems": [')
if idx != -1:
    idx = content.find('[', idx) + 1
    if content[idx] == '\n':
        idx += 1
    new_content = content[:idx] + new_str + content[idx:]
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully inserted creative corner items!")
else:
    print("Could not find contentItems: [")

import json, uuid

new_item = f'''    {{
      "id": "{uuid.uuid4()}",
      "group_id": "87ddf96e-deea-4ebc-b2b8-64bb27480567",
      "activity_id": "49361060-cb6e-48bc-a968-56be93253402",
      "kind": "presentation",
      "title": "Renewable Energy",
      "student_name": "Team 1 (S.H. Fernando, N.Y.S. Samarasinghe, M.Dilusha Sandaru, W.M.U. Sandasiri)",
      "preview_image": "assets/presentations.jpg",
      "external_url": "assets/renewable_energy_cd2_team1.pdf",
      "description": "A comprehensive presentation on renewable energy sources like solar, wind, and hydropower. It highlights the environmental benefits, energy challenges, and future solutions in clean technology.",
      "created_at": "2026-10-07T00:00:00Z"
    }},\n'''

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

idx = content.find('"contentItems": [')
if idx != -1:
    idx = content.find('[', idx) + 1
    if content[idx] == '\n':
        idx += 1
    new_content = content[:idx] + new_item + content[idx:]
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully inserted presentation item!")
else:
    print("Could not find contentItems: [")

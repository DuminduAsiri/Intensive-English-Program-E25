import json
import os
import re

file_path = 'js/data.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

entries = []
for i in range(1, 25):
    entry = f'''    {{
      "id": "cd04-presentation-{i}",
      "group_id": "33170e6f-f850-4cb2-b300-5f97e6c31a88",
      "activity_id": "49361060-cb6e-48bc-a968-56be93253402",
      "kind": "presentation",
      "title": "Presentation {i}",
      "student_name": "",
      "preview_image": "assets/cd04_presentation_preview.jpg",
      "external_url": "assets/cd04_presentation_{i}.pdf",
      "description": "A presentation submitted by a student of Group CD 04.",
      "created_at": "2026-10-07T09:15:{i:02d}Z"
    }}'''
    entries.append(entry)

entries_str = ',\n' + ',\n'.join(entries) + '\n  ]'

new_content = re.sub(r'\}\s*\]\s*\}\;', '}' + entries_str + '};', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Added 24 presentations')

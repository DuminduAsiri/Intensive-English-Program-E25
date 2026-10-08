import re
import json

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract activities array
match = re.search(r'"activities":\s*(\[.*?\]),?\s*"(panelMembers|groupMembers|contentItems)"', content, re.DOTALL)
if match:
    activities_str = match.group(1)
    activities = json.loads(activities_str)
    for act in activities:
        print(act['id'], act['title'])

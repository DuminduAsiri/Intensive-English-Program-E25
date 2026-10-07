import json
import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON part
match = re.search(r'const DATA = (\{.*\});', content, re.DOTALL)
if not match:
    print("Could not parse DATA")
    exit(1)

data_str = match.group(1)
# Convert JS object to JSON string by quoting keys
data_str = re.sub(r'^\s*([a-zA-Z0-9_]+)\s*:', r'"\1":', data_str, flags=re.MULTILINE)
data = json.loads(data_str)

group_members = data['groupMembers']

# We need to sort groupMembers by group_id, then by reg_no (numerical part)
def get_num(reg_no):
    if not reg_no: return 999999
    m = re.search(r'\d+$', reg_no.strip())
    if m:
        return int(m.group(0))
    return 999999

# We will just update 'sort_order' for each group
groups_dict = {}
for member in group_members:
    gid = member['group_id']
    if gid not in groups_dict:
        groups_dict[gid] = []
    groups_dict[gid].append(member)

for gid, members in groups_dict.items():
    members.sort(key=lambda x: get_num(x.get('reg_no', '')))
    for idx, member in enumerate(members):
        member['sort_order'] = idx + 1

# Reconstruct groupMembers array
new_group_members = []
# We can also sort the whole array by group_id, then sort_order
for gid in sorted(groups_dict.keys()):
    new_group_members.extend(groups_dict[gid])

data['groupMembers'] = new_group_members

new_data_str = json.dumps(data, indent=2)
# Replace the original JSON string
new_content = content[:match.start(1)] + new_data_str + content[match.end(1):]

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully sorted group members!")

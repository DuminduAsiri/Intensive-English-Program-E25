import json
import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the header comment
header_match = re.match(r'^[\s\S]*?\*\/\s*', content)
header = header_match.group(0) if header_match else ''

# Extract the JSON part
match = re.search(r'const DATA = (\{.*\});', content, re.DOTALL)
if not match:
    print("Could not parse DATA")
    exit(1)

data_str = match.group(1)
# Remove // comments
data_str = re.sub(r'//.*$', '', data_str, flags=re.MULTILINE)
# Remove trailing commas
data_str = re.sub(r',\s*([\]}])', r'\1', data_str)
# Quote unquoted keys (if any)
data_str = re.sub(r'^\s*([a-zA-Z0-9_]+)\s*:', r'"\1":', data_str, flags=re.MULTILINE)

try:
    data = json.loads(data_str)
except json.JSONDecodeError as e:
    print(f"JSON error: {e}")
    # try one more trick if it fails
    exit(1)

group_members = data['groupMembers']

def get_num(reg_no):
    if not reg_no: return 999999
    m = re.search(r'\d+$', reg_no.strip())
    if m:
        return int(m.group(0))
    return 999999

groups_dict = {}
for member in group_members:
    gid = member['group_id']
    if gid not in groups_dict:
        groups_dict[gid] = []
    groups_dict[gid].append(member)

sorted_members = []
for gid in sorted(groups_dict.keys()):
    members = groups_dict[gid]
    members.sort(key=lambda x: get_num(x.get('reg_no') or x.get('registration_no')))
    for idx, member in enumerate(members):
        member['sort_order'] = idx + 1
    sorted_members.extend(members)

data['groupMembers'] = sorted_members

new_data_str = json.dumps(data, indent=2)
new_content = header + "const DATA = " + new_data_str + ";\n"

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully sorted group members!")

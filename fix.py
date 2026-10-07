import re

with open("js/data.js", "r", encoding="utf-8") as f:
    content = f.read()

content = re.sub(r'"reg_no":', '"registration_no":', content)
content = content.replace('"role": "Member",\n      "committee": "Member",', '"role_in_group": "Student",\n      "committee": null,')

with open("js/data.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Done!")

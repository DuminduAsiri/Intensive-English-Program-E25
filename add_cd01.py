import json

presentations = [
    {"title": "Copper", "student_name": "B.P.B.R. Shehan"},
    {"title": "Graphene", "student_name": "S.N. Senanayaka"},
    {"title": "Nitinol", "student_name": "U.A. Pramidu"},
    {"title": "PVC", "student_name": "D.K.R. Raveena"},
    {"title": "Stainless Steel", "student_name": "R.M.S.B. Ranasingha"},
    {"title": "Titanium alloy", "student_name": "W.G.D. Sithsara"},
    {"title": "Carbon fibre composite", "student_name": "K.T.A.G.B. Thennakoon"},
    {"title": "Burj khalifa", "student_name": "S.N. Senanayaka , W.G.P. Sameera , K.A.T. Theekshana"},
    {"title": "Giza pyramid", "student_name": "U.A. Pramidu , D.K.R. Raveena"}
]

group_id = "765941e5-ce97-442b-8c01-a45f56c007e4"
activity_id = "49361060-cb6e-48bc-a968-56be93253402"

new_entries = []
for i, pres in enumerate(presentations, start=1):
    entry = f"""    {{
      "id": "cd01-presentation-{i}",
      "group_id": "{group_id}",
      "activity_id": "{activity_id}",
      "kind": "presentation",
      "title": "{pres['title']}",
      "student_name": "{pres['student_name']}",
      "preview_image": "assets/cd01_presentation_{i}_preview.jpg",
      "external_url": "assets/cd01_presentation_{i}.pdf",
      "description": "A presentation submitted by a student of Group CD 01.",
      "created_at": "2026-10-07T10:00:0{i}Z"
    }}"""
    new_entries.append(entry)

new_entries_str = ",\n".join(new_entries) + ",\n"

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('"contentItems": [\n', '"contentItems": [\n' + new_entries_str)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added CD01 presentations.")

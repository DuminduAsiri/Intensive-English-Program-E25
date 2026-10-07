import json
group_id = '87ddf96e-deea-4ebc-b2b8-64bb27480567'
students = [
    {'name': 'H.W.A. Thamarangi', 'reg': 'E/25/385'},
    {'name': 'G.K.O. Thilasha', 'reg': 'E/25/398'},
    {'name': 'S.A. Sathruwanee', 'reg': 'E/25/359'},
    {'name': 'W.M.U. Sandasiri', 'reg': 'E/25/444'},
    {'name': 'N.Y.S. Samarasinghe (Nipun yashod)', 'reg': 'E/25/342'},
    {'name': 'M. Dilusha Sandaru', 'reg': 'E/25/371'},
    {'name': 'H.M. Kaveesha Rukshan', 'reg': 'E/25/336'},
    {'name': 'P.A. Gethmin withmal', 'reg': 'E/25/448'},
    {'name': 'T.G. Sineth Sanujaya', 'reg': 'E/25/353'},
    {'name': 'S.H. Fernando', 'reg': 'E/25/126'},
    {'name': 'S.A.M. Prabhani', 'reg': 'E/25/300'}
]
import uuid
result = []
for i, s in enumerate(students):
    obj = f'''    {{
      "id": "{uuid.uuid4()}",
      "group_id": "{group_id}",
      "full_name": "{s['name']}",
      "reg_no": "{s['reg']}",
      "role": "Member",
      "committee": "Member",
      "photo_url": null,
      "sort_order": {i+1}
    }}'''
    result.append(obj)

new_str = ',\n'.join(result) + ','
print(new_str)

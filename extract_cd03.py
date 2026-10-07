import json
import re
import random

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to assign committees to CD03 students
# W.A.Pehan Dilmith E/25/308 -> Web Committee
# M.Milhan E/25/259 -> Web Committee
# Others randomly into Editorial, Media, Project

lines = content.split('\n')
in_cd03 = False
committees_pool = ['Editorial', 'Media', 'Project'] * 10 # ensure we have enough
random.shuffle(committees_pool)
pool_idx = 0

for i, line in enumerate(lines):
    if 'edcd3049-1802-474c-a473-9f1ee8116b53' in line:
        in_cd03 = True
        student_lines = []
    
    if in_cd03:
        if '\"registration_no\": \"E/25/308\"' in line or '\"registration_no\": \"E/25/259\"' in line:
            # We will catch this in the committee line
            pass
        
        # When we hit 'committee', we replace it
        if '\"committee\":' in line:
            # Let's peek backwards to find the registration_no
            is_web = False
            for j in range(i-5, i):
                if j >= 0 and ('\"registration_no\": \"E/25/308\"' in lines[j] or '\"registration_no\": \"E/25/259\"' in lines[j]):
                    is_web = True
                    break
            
            # Wait, the placeholder is "Student Name" and "E25/003" initially!
            # Let's check if the real names are in the file first!
            pass

    if in_cd03 and '},' in line:
        in_cd03 = False

# Actually, let's just do a dry run and print CD03 members first
in_cd03 = False
current_student = {}
students = []

for line in lines:
    if 'edcd3049-1802-474c-a473-9f1ee8116b53' in line:
        in_cd03 = True
        current_student = {}
    
    if in_cd03:
        if '\"full_name\":' in line:
            current_student['name'] = line.split('\"')[3]
        if '\"registration_no\":' in line:
            current_student['reg'] = line.split('\"')[3]
        
        if '},' in line or '}' in line and not ',' in line and in_cd03:
            # End of object
            if current_student.get('name'):
                students.append(current_student)
            in_cd03 = False

for s in students:
    print(f"{s.get('name')} - {s.get('reg')}")

import json
import re
import random

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
in_cd02 = False
committees_pool = ['Editorial', 'Media', 'Project'] * 10
random.shuffle(committees_pool)
pool_idx = 0

current_reg = None

for i, line in enumerate(lines):
    if '87ddf96e-deea-4ebc-b2b8-64bb27480567' in line:
        in_cd02 = True
        current_reg = None
    
    if in_cd02:
        if '\"registration_no\":' in line:
            current_reg = line.split('\"')[3]
            
        if '\"committee\":' in line:
            has_comma = ',' if line.endswith(',') else ''
            if current_reg == 'E/25/371' or current_reg == 'E/25/300':
                new_com = "Web Committee"
            else:
                new_com = committees_pool[pool_idx]
                pool_idx += 1
                
            prefix = line.split('\"committee\":')[0]
            lines[i] = f'{prefix}\"committee\": \"{new_com}\"{has_comma}'

        if '},' in line or ('}' in line and not ',' in line):
            in_cd02 = False

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print('Done')

import json
import re
import random

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
in_cd03 = False
committees_pool = ['Editorial', 'Media', 'Project'] * 10
random.shuffle(committees_pool)
pool_idx = 0

current_reg = None

for i, line in enumerate(lines):
    if 'edcd3049-1802-474c-a473-9f1ee8116b53' in line:
        in_cd03 = True
        current_reg = None
    
    if in_cd03:
        if '\"registration_no\":' in line:
            current_reg = line.split('\"')[3]
            
        if '\"committee\":' in line:
            if current_reg == 'E/25/308' or current_reg == 'E/25/259':
                lines[i] = re.sub(r'\"committee\":.*', '\"committee\": \"Web Committee\"', line)
            elif current_reg == 'E25/003':
                lines[i] = re.sub(r'\"committee\":.*', '\"committee\": null', line)
            else:
                lines[i] = re.sub(r'\"committee\":.*', f'\"committee\": \"{committees_pool[pool_idx]}\"', line)
                if not line.endswith(','):
                    lines[i] += ',' if ',' in line else '' # handle trailing commas correctly if it was at end
                    # actually data.js has it like `"committee": "Media"` or `"committee": null` sometimes without comma if it's the last property.
                    pass
                
                # Let's cleanly replace
                comma = ',' if line.endswith(',') else ''
                lines[i] = line.split('\"committee\":')[0] + f'\"committee\": \"{committees_pool[pool_idx]}\"{comma}'
                pool_idx += 1

        if '},' in line or ('}' in line and not ',' in line):
            in_cd03 = False

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print('Done')

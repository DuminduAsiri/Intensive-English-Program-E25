import re

names = {
    1: "P.L.S.Ranulya",
    2: "Ashen Perera",
    3: "Pamudu Prabhashana",
    4: "Isira Wickramasinghe",
    5: "Oshadhi Shenaya",
    6: "M.Thijejithan",
    7: "Visal Wickramasinghe",
    8: "Majitha Priyathilaka",
    9: "Malindu Pramod",
    10: "T.Sanjeev",
    11: "Nimesh Sampath",
    12: "Viran Randika",
    13: "Olitha Jayawardhana",
    14: "Dasun Dananjaya",
    15: "Dilith Saminda",
    16: "Dumindu Asiri",
    17: "R.Pakeerathan",
    18: "A.Renojathushan",
    19: "Sakkirkan",
    20: "M.Yuvaraj",
    21: "G.B.Nanthagoban",
    22: "Achini Upeksha",
    23: "Muthuni De Silva",
    24: "Ravindu Shyamal"
}

data_file = 'js/data.js'
with open(data_file, 'r', encoding='utf-8') as f:
    content = f.read()

for i, name in names.items():
    pattern = re.compile(r'("id":\s*"cd04-presentation-' + str(i) + r'",[^{}]*?"student_name":\s*)"[^"]*"')
    content = pattern.sub(r'\g<1>"' + name + '"', content)

with open(data_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Names updated.")

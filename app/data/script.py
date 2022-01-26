import json
import os

with open('oxbuild_index.json', 'r') as f:
    data = json.load(f)

new_path = []
for path in data['paths']:
    new_path.append(os.path.basename(path))

print(new_path)

data['paths'] = new_path

with open('oxbuild_index_2.json', 'w') as f:
    json.dump(data, f)
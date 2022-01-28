import json
import os

with open('data_paris_vgg16_pretrain.json', 'r') as f:
    data = json.load(f)

new_path = []
for path in data['paths']:
    new_path.append(os.path.basename(path))

print(new_path)

data['paths'] = new_path

with open('paris_index.json', 'w') as f:
    json.dump(data, f)
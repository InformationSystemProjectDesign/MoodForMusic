import os.path

path = '/Users/rogerpei/Desktop/txt/txt'
files = os.listdir(path)

for file in files:
    new_name = file
    os.rename(os.path.join(path, file), os.path.join(path, ''.join([new_name, '.txt'])))
import gdown
import tarfile
import os

def get_oxbuild_data():
    oxbuild_id = '1z3nQ_p3PrYxbk0aaViTaUysPpB7Re2ER'
    oxbuild_path = 'app/images/oxbuild_images'
    oxbuild_tgz = 'oxbuild.tgz'

    print('[INFO] Checking for Oxbuild data...')

    if not os.path.exists(oxbuild_path):
        print('[INFO] Oxbuild images data does not exist! Download new data')

        try:
            gdown.download(id=oxbuild_id, output=oxbuild_tgz, quiet=False)
        except:
            print('[ERROR] An error occurs when downloading data')
            exit(-1)

        os.makedirs(oxbuild_path)

        oxbuild = tarfile.open(oxbuild_tgz)
        oxbuild.extractall(path=oxbuild_path)

        os.remove(oxbuild_tgz)
    else:
        print('[INFO] Data is available ^_^')

if __name__ == '__main__':
    get_oxbuild_data()
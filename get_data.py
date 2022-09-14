import gdown
import tarfile
import os

def get_oxbuild_data():
    oxbuild_id = '1z3nQ_p3PrYxbk0aaViTaUysPpB7Re2ER'
    oxbuild_path = 'app/public/images'
    oxbuild_tgz = 'oxbuild_images.tgz'

    print('[INFO] Checking for Oxbuild data...')

    if not os.path.exists(oxbuild_path+'/all_souls_000000.jpg'):
        print('[INFO] Oxbuild images data does not exist! Download new data')

        try:
            gdown.download(id=oxbuild_id, output=oxbuild_tgz, quiet=False)

            os.makedirs(oxbuild_path, exist_ok=True)

            oxbuild = tarfile.open(oxbuild_tgz)
            oxbuild.extractall(path=oxbuild_path)

            os.remove(oxbuild_tgz)
        except:
            print('[ERROR] An error occurs when downloading data')
            exit(-1)

    else:
        print('[OK] Data Oxbuild is available ^_^')


def get_paris_data():
    paris_id = '1-302BDlFHcjfv5Bc4YjYYXMCsd9oifbH'
    paris_tgz = 'paris.tar'
    paris_path = 'app/public/images'

    print('[INFO] Checking for Paris data...')

    if not os.path.exists(paris_path+'/paris_defense_000000.jpg'):
        print('[INFO] Paris images data does not exist! Download new data')

        try:
            gdown.download(id=paris_id, output=paris_tgz, quiet=False)

            os.makedirs(paris_path, exist_ok=True)

            paris = tarfile.open(paris_tgz)
            paris.extractall(path=paris_path)

            # os.remove(paris_tgz)
        except:
            print('[ERROR] An error occurs when downloading data')
            exit(-1)

    else:
        print('[OK] Data Paris is available ^_^')


if __name__ == '__main__':
    get_oxbuild_data()
    get_paris_data()

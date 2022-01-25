import os
import random

def get_similar(img = None):
    images = os.listdir('app/public/images/oxbuild_images')
    return [random.choice(images) for i in range(20)]
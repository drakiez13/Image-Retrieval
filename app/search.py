from email.mime import image
from app.extract_vector import search
import io
import base64
import time
from PIL import Image

def get_similar(image_endcoded, dataset):
    msg = base64.b64decode(image_endcoded)
    buf = io.BytesIO(msg)
    img = Image.open(buf)

    begin = time.time()
    result = search(img, 50, dataset)
    end = time.time()

    return result, end - begin
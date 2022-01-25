# Image Retrieval

Final Project for CS336

## Authors

| No  | ID       | Name                     | Class    |
| --- | -------- | ------------------------ | -------- |
| 1   | 19520951 | Trần Quốc Thắng          | KHTN2019 |
| 2   | 19521599 | Châu Ngọc Huy            | KHTN2019 |
| 3   | 19521855 | Trần Công Minh           | KHTN2019 |
| 4   | 19521908 | Phan Tiến Ngọc           | KHTN2019 |

## Usage

### Run from remote docker image

Pull lastest image from docker hub and run it

```bash
# You may be asked for logging to dockerhub
docker pull drakiez92/image-retrieval
docker run -p 80:80 --name image-retrieval drakiez92/image-retrieval
```
> Note: It will take a while on first run to download all images data

You may want to use volume to keep images data over time

```bash
docker volume create image-retrieval-images
docker pull drakiez92/image-retrieval
docker run -p 80:80 --name image-retrieval \
    --mount source=image-retrieval-images,target=/app/public/images \
    drakiez92/image-retrieval
```

### Build and run from source

Clone source code from github

```bash
git clone https://github.com/drakiez92/Image-Retrieval
```

To prevent re-downloading new images data every image-build, you should download the data first.

```bash
python get_data.py
```

After that, build docker image and run it.

```bash
docker build -t image-retrieval .
docker run -p 80:80 --name image-retrieval image-retrieval
```
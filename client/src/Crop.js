import ReactDOM from 'react-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import React, { useState, useEffect } from 'react';
import './Crop.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}
const Input = styled('input')({
    display: 'none',
});

const Cropper = () => {
    const [src, selectFile] = useState(null)
    const handleFileChange = e => {
        selectFile(URL.createObjectURL(e.target.files[0]));
    }

    var flag = true
    const [time, setTime] = useState(null)
    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({});
    const [result, setResult] = useState()
    const [images, setImages] = useState()

    function getCroppedImg() {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        // setFlag(!flag)
        flag = !flag
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        const base64Image = canvas.toDataURL("image/jpeg");
        setResult(base64Image)

        const img = { 'image': result }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(img)
        };
        fetch('/api/search', requestOptions)
            .then(response => response.json())
            .then(data => {
                setImages(data.images)
                setTime(data.time)
                console.log(data)
            });
    }
    // useEffect(() => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(result)
    //     };
    //     fetch('/api/search', requestOptions)
    //         .then(response => response.json())
    //         .then(data => {setImages(data.images)
    //             console.log(data)});

    // }, [])

    return (
        <div className="container">

            <div className='page1'>
                <div className='head'>

                    <h1>YONIN</h1>
                </div>
                <div className='intro'>
                    <p>Welcome to YoninSearch</p>
                    <p>Let's start...</p>
                </div>
            </div>
            <div className='page2'>
                <div className='left'>
                    <h2 style={{ color: 'rgb(27, 127, 241)', fontSize: 32, marginTop: 100 }}>Choose Image from your device</h2>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={handleFileChange} />
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                    {src && <div>
                        <div className='ori-img-cover'>
                            <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} className="origin-img" />

                        </div>
                        <Button variant="contained" onClick={getCroppedImg} style={{ marginTop: 30 }}>Search </Button>
                    </div>}
                    {time &&<h4 style={{ fontStyle: 'italic' }}>Time query: {time}</h4>}
                </div>
                <div className='right'>
                    {images &&
                        <div>

                            <ImageList sx={{ width: 600, height: 650, alignItems: 'center', mx: 'auto', mt: '80px', background: 'white', border: '1px solid rgb(133, 167, 196)' }} cols={3}  >
                                {images.map((item) => (
                                    <ImageListItem key={item}>
                                        <img
                                            src={`/images/oxbuild_images/${item}`}
                                            srcSet={`/images/oxbuild_images/${item}`}
                                            alt={`${item}`}

                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </div>}
                </div>

            </div>
        </div>
    )
}

export default Cropper;
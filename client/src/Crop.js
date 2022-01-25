import ReactDOM from 'react-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import React, { useState } from 'react';
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

    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
            cols: 2,
        }
    ]

    const [src, selectFile] = useState(null)
    const handleFileChange = e => {
        selectFile(URL.createObjectURL(e.target.files[0]));
    }

    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    const [result, setResult] = useState(src)

    function getCroppedImg() {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");



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
        console.log(result)
        // canvas.toBlob(blob=>{
        //     console.log(blob)
        //     setResult(blob)
        // })
    }
    return (
        <div className="container">
            <div className='page1'>
                <div className='head'>
                    {/* <img src='./YoninSearch.png' alt='logo'/> */}
                    <h1>YONIN</h1>
                </div>
                <div className='intro'>
                    <p>Welcome to YoninSearch</p>
                    <p>Let's start...</p>
                </div>
            </div>
            <div className='page2'>

                <div className='intro2' >
                    <h2 style={{ color: 'rgb(27, 127, 241)', fontSize: 32 }}>Choose Image from your device</h2>
                    {/* <input accept='image/*' type='file' onChange={handleFileChange} className='inp-img' /> */}
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={handleFileChange} />
                        <Button variant="contained" component="span">
                            Upload
                        </Button>
                    </label>
                    {src && <div className='ori-img-cover' >
                        <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} className="origin-img" />
                        {/* <button className="btn-danger" onClick={getCroppedImg}>Crop Image</button> */}
                        <Button variant="contained" onClick={getCroppedImg} style={{ marginBottom: 40 }}>Search </Button>
                    </div>}
                    <ImageList sx={{ width: 650, height: 650, alignItems: 'center', mx: 'auto' }} cols={3}  >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img}>
                                <img
                                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>

            </div>
            {/* <div className='footer'>
                <ul>
                    <li>Tran Quoc Thang</li>
                    <li>Tran Cong Minh</li>
                    <li>Chau Ngoc Huy</li>
                    <li>Phan Tien Ngoc</li>
                </ul>
            </div> */}

            {/* </div>
            <div className="btn-chooseImg">
                
            </div>
            {src && <div >
                <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} className="origin-img" />
                <button className="btn-danger" onClick={getCroppedImg}>Crop Image</button>
            </div>}
            {result && <div>
                <img src={result} alt="Crop Image" className="img-cropped" />
            </div>} */}
            {/*  */}
        </div >
    )
}

export default Cropper;
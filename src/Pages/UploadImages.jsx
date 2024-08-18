import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useContext } from "react";
import productContext from '../context/products/productContext';

function UploadImages() {
    const [files, setFiles] = useState({
        featuredImage: null, subImage1: null, subImage2: null, subImage3: null,
    });
    const [message, setMessage] = useState('');
    const [filePaths, setFilePaths] = useState({});

    const context = useContext(productContext);  
    const { host } = context; //destructuring

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFiles(prevFiles => ({
            ...prevFiles,
            [name]: files[0]
        }));
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(files).forEach(key => {
            if (files[key]) {
                formData.append(key, files[key]);
            }
        });

        try {
            const response = await axios.post(`${host}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(response.data.message);
            setFilePaths(response.data.filePaths);
        } catch (error) {
            console.error('There was an error uploading the file!', error);
            setMessage('Failed to upload the file.');
        }
    };
    return (
        <>
            <Box sx={{ maxWidth: 800, margin: 'auto', mt: 5 }}>
                <h1>Upload Images</h1>
                <form onSubmit={handleUpload} className='pt-4'>
                    <label className='mr-3' htmlFor="featuredImage">Featured Image</label>
                    <input type="file" name='featuredImage' onChange={handleFileChange} className='mb-4' /> <br />

                    <label className='mr-4' htmlFor="subImage1">Sub Image - 1</label>
                    <input type="file" name='subImage1' onChange={handleFileChange} className='mb-4' /><br />

                    <label className='mr-4' htmlFor="subImage1">Sub Image - 2</label>
                    <input type="file" name='subImage2' onChange={handleFileChange} className='mb-4' /><br />

                    <label className='mr-4' htmlFor="subImage1">Sub Image - 3</label>
                    <input type="file" name='subImage3' onChange={handleFileChange} className='mb-4' /><br />
                    <Button type='submit' variant="contained" color="primary">Upload</Button>
                    <Button variant="contained" color="primary" className='mx-2'><Link to="/admin/gallery" style={{ color: '#ffff', textDecoration: 'none' }}>Get an Image From Gallery</Link></Button>
                </form>
                {message && <p>{message}</p>}
                {Object.keys(filePaths).length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <h2>Uploaded Files</h2>
                        <ul>
                            {Object.keys(filePaths).map(key => (
                                <li key={key}>
                                    <strong>{key.replace('Path', '')}:</strong> <a href={filePaths[key]} target="_blank" rel="noopener noreferrer">{filePaths[key]}</a>
                                </li>
                            ))}
                        </ul>
                    </Box>
                )}
            </Box>
        </>
    );
}

export default UploadImages;

// Upload.js
import React, { useState, useEffect } from 'react';

const Upload = ({ onLogout }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFiles.length === 0) {
            setMessage('Please select at least one file first');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.text();
            if (response.ok) {
                setMessage('Files uploaded successfully!');
                fetchImages(); // Actualizar la lista de imágenes después de subir
            } else {
                setMessage(data || 'File upload failed');
            }
        } catch (error) {
            setMessage(`An error occurred: ${error.message}`);
        }
    };

    const fetchImages = async () => {
        try {
            const response = await fetch('http://localhost:5000/upload');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setImages(data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchImages(); // Cargar las imágenes al montar el componente
    }, []);

    return (
        <div className="upload-container">
            <h2>Upload Files</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept="image/*" multiple required />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
            <div>
                {images.map((img, index) => (
                    <div key={index}>
                        <h4>{img.filename}</h4>
                        <img src={`data:${img.contentType};base64,${img.imageBase64}`} alt={img.filename} style={{ maxWidth: '100px' }} />
                    </div>
                ))}
            </div>
            <button onClick={onLogout}>Logout</button> {/* Botón de cierre de sesión */}
        </div>
    );
};

export default Upload;





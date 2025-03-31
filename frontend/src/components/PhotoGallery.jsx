import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../utils/axiosConfig';
import '../styles/PhotoGallery.css';
import { useParams } from 'react-router-dom';

const PhotoGallery = () => {
  const [state, setState] = useState({
    photos: [], loading: true, error: null, uploadingPhoto: false,
    selectedFile: null, caption: '', previewImages: []
  });
  const { weddingId } = useParams();
  const { photos, loading, error, uploadingPhoto, selectedFile, caption, previewImages } = state;
  const fileInputRef = useRef(null);

  const updateState = (newState) => setState(prev => ({ ...prev, ...newState }));

  useEffect(() => {
    if (weddingId && weddingId !== "placeholder-wedding-id") {
      fetchPhotos();
    } else {
      updateState({ photos: [], error: "No wedding ID available. Please create a wedding first.", loading: false });
    }
  }, [weddingId]);

  // Clean up object URLs when component unmounts or when previewImages change
  useEffect(() => {
    return () => {
      // Revoke all object URLs to prevent memory leaks
      previewImages.forEach(item => URL.revokeObjectURL(item.preview));
    };
  }, [previewImages]);

  const fetchPhotos = async () => {
    try {
      const response = await axiosInstance.get(`/api/weddings/${weddingId}/photos`);
      updateState({ 
        photos: Array.isArray(response.data) ? response.data : 
          (response.data?.photos) ? response.data.photos : [],
        loading: false 
      });
    } catch (err) {
      updateState({ photos: [], error: 'Failed to load photos.', loading: false });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Clean up previous preview URL if it exists
      previewImages.forEach(item => URL.revokeObjectURL(item.preview));
      
      updateState({ 
        selectedFile: file, 
        previewImages: [{ file, preview: URL.createObjectURL(file) }] 
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return updateState({ error: 'Please select a file to upload' });
    
    const formData = new FormData();
    formData.append('photo', selectedFile);
    formData.append('caption', caption);
    
    try {
      updateState({ uploadingPhoto: true });
      const response = await axiosInstance.post(`/api/weddings/${weddingId}/photos`, 
        formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      
      // Reset file input using ref instead of direct DOM manipulation
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Clean up the preview URL
      previewImages.forEach(item => URL.revokeObjectURL(item.preview));
      
      updateState({ 
        photos: [...photos, response.data], selectedFile: null,
        caption: '', previewImages: [], uploadingPhoto: false 
      });
    } catch (err) {
      updateState({ error: 'Upload failed.', uploadingPhoto: false });
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      await axiosInstance.delete(`/api/weddings/${weddingId}/photos/${photoId}`);
      updateState({ photos: photos.filter(photo => photo._id !== photoId) });
    } catch (err) {
      updateState({ error: 'Delete failed.' });
    }
  };

  if (loading && !photos.length) return <div>Loading photos...</div>;
  
  return (
    <div className="photo-gallery-container">
      <h2>Wedding Photo Gallery</h2>
      <div className="upload-section">
        <form onSubmit={handleUpload} className="upload-form">
          <input 
            type="file" 
            id="photo-upload" 
            ref={fileInputRef}
            accept="image/*" 
            onChange={handleFileChange} 
          />
          <input 
            type="text" 
            value={caption} 
            onChange={(e) => updateState({caption: e.target.value})} 
            placeholder="Caption (optional)" 
          />
          <button type="submit" disabled={uploadingPhoto || !selectedFile}>
            {uploadingPhoto ? 'Uploading...' : 'Upload Photo'}
          </button>
          {previewImages.length > 0 && <div className="preview-container">
            {previewImages.map((item, i) => <img key={i} src={item.preview} alt="Preview" />)}
          </div>}
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
      <div className="gallery-section">
        {!photos.length ? <div>No photos yet.</div> : 
          <div className="photo-grid">
            {photos.map(photo => (
              <div key={photo._id || Math.random()} className="photo-item">
                <img src={`/uploads/${photo.filename}`} alt={photo.originalName} />
                <button onClick={() => handleDeletePhoto(photo._id)}>Delete</button>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default PhotoGallery;
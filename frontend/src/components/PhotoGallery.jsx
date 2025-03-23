import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosConfig';
import '../styles/PhotoGallery.css';

const PhotoGallery = ({ weddingId }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState('');

  // Fetch photos when component mounts
  useEffect(() => {
    if (weddingId && weddingId !== "placeholder-wedding-id") {
      console.log('Fetching photos for wedding ID:', weddingId);
      fetchPhotos();
    } else {
      console.log('No valid wedding ID available');
      setPhotos([]);
      setError("No wedding ID available. Please create a wedding first.");
    }
  }, [weddingId]);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/weddings/${weddingId}/photos`);
      
      // Make sure we're setting an array to the state
      if (Array.isArray(response.data)) {
        setPhotos(response.data);
      } else if (response.data && Array.isArray(response.data.photos)) {
        setPhotos(response.data.photos);
      } else {
        console.error('Unexpected response format:', response.data);
        setPhotos([]);  // Set to empty array if data is not as expected
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Failed to load photos. Please try again later.');
      setPhotos([]);  // Set to empty array on error
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create preview images
    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setPreviewImages(previews);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one file to upload');
      return;
    }
    
    if (!weddingId || weddingId === "placeholder-wedding-id") {
      setError('No valid wedding ID available. Please create a wedding first.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('photos', file);
      });

      const response = await axiosInstance.post(
        `/api/weddings/${weddingId}/photos`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        }
      );

      // Clear selected files and previews after successful upload
      setSelectedFiles([]);
      setPreviewImages([]);
      setUploadProgress(0);
      
      // Refresh the photo gallery
      fetchPhotos();
      
      setLoading(false);
    } catch (error) {
      console.error('Error uploading photos:', error);
      setError('Failed to upload photos. Please try again.');
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) {
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.delete(`/api/weddings/${weddingId}/photos/${photoId}`);
      
      // Update the photos state by removing the deleted photo
      setPhotos(photos.filter(photo => photo._id !== photoId));
      
      setLoading(false);
    } catch (error) {
      console.error('Error deleting photo:', error);
      setError('Failed to delete photo. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="photo-gallery-container">
      {/* Debug info */}
      <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
        Wedding ID: {weddingId || 'Not available'}
      </div>
      
      <h2 className="gallery-title">Wedding Photo Gallery</h2>
      
      {/* Upload section */}
      <div className="upload-section">
        <h3>Add New Photos</h3>
        <div className="file-input-container">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            id="photo-upload"
            className="file-input"
          />
          <label htmlFor="photo-upload" className="file-input-label">
            Choose Files
          </label>
          <button 
            onClick={handleUpload} 
            disabled={loading || selectedFiles.length === 0}
            className="upload-button"
          >
            Upload Photos
          </button>
        </div>
        
        {/* Preview selected images */}
        {previewImages.length > 0 && (
          <div className="preview-container">
            <h4>Selected Photos ({previewImages.length})</h4>
            <div className="preview-grid">
              {previewImages.map((item, index) => (
                <div key={index} className="preview-item">
                  <img src={item.preview} alt={`Preview ${index}`} />
                  <span className="file-name">{item.file.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Upload progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="progress-text">{uploadProgress}%</span>
          </div>
        )}
        
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}
      </div>
      
      {/* Photo gallery */}
      <div className="gallery-section">
        <h3>Your Wedding Photos</h3>
        {loading && photos.length === 0 ? (
          <div className="loading">Loading photos...</div>
        ) : photos.length === 0 ? (
          <div className="no-photos">No photos uploaded yet.</div>
        ) : (
          <div className="photo-grid">
            {Array.isArray(photos) && photos.map((photo) => (
              <div key={photo._id || Math.random()} className="photo-item">
                <img 
                  src={`/uploads/${photo.filename}`} 
                  alt={photo.originalName} 
                />
                <div className="photo-overlay">
                  <button 
                    className="delete-button"
                    onClick={() => handleDeletePhoto(photo._id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery; 
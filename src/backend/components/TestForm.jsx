import { useState } from 'react';
import { API_URL } from '../../config/constants';

export default function SongUpload() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedSingleFile, setSelectedSingleFile] = useState(null);
  const [selectedBatchFiles, setSelectedBatchFiles] = useState(null);

  const handleSingleUpload = async (event) => {
    event.preventDefault();
    if (!selectedSingleFile) return;

    const formData = new FormData();
    formData.append('file', selectedSingleFile);

    setUploading(true);

    try {
      const response = await fetch(`${API_URL}/api/upload/songs/single`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setResult(data);
      // Reset form after successful upload
      event.target.reset();
      setSelectedSingleFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleBatchUpload = async (event) => {
    event.preventDefault();
    if (!selectedBatchFiles) return;

    const files = Array.from(selectedBatchFiles).filter(
      file => file.type === 'audio/mpeg'
    );

    if (files.length === 0) {
      alert('No MP3 files found in selected folder');
      return;
    }

    if (files.length > 100) {
      alert('Too many files. Maximum 100 files per upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      const response = await fetch(`${API_URL}/api/upload/songs/batch`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setResult(data);
      // Reset form after successful upload
      event.target.reset();
      setSelectedBatchFiles(null);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSingleUpload}>
        <h3>Single Song Upload</h3>
        <div>
          <input
            type="file"
            accept=".mp3"
            onChange={(e) => setSelectedSingleFile(e.target.files[0])}
            disabled={uploading}
          />
          <button
            type="submit"
            disabled={!selectedSingleFile || uploading}
          >
            Upload Single Song
          </button>
        </div>
      </form>

      <form onSubmit={handleBatchUpload}>
        <h3>Batch Upload</h3>
        <div>
          <input
            type="file"
            webkitdirectory="true"
            directory="true"
            multiple
            onChange={(e) => setSelectedBatchFiles(e.target.files)}
            disabled={uploading}
          />
          <button
            type="submit"
            disabled={!selectedBatchFiles || uploading}
          >
            Upload Batch
          </button>
        </div>
      </form>

      {uploading && <div>Uploading...</div>}
      {result && (
        <div>
          <h3>Upload Results:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
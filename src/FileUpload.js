import React, { useState, useRef } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploading, setUploading] = useState(false);
  const start = useRef(0);
  const intervalRef = useRef();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadPercentage(0);
    start.current = 0;
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const totalSize = selectedFile.size;
      const chunkSize = 1000000;

      intervalRef.current = setInterval(() => {
        const chunk = selectedFile.slice(
          start.current,
          start.current + chunkSize
        );
        if (chunk.size === 0) {
          clearInterval(intervalRef.current);
          setUploading(false);
          setSelectedFile(null);
          return;
        }

        const formData = new FormData();
        formData.append("file", chunk);

        fetch("http://localhost:5000/api/fileupload", {
          method: "POST",
          body: formData,
        });

        start.current += chunkSize;
        setUploadPercentage((start.current / totalSize) * 100);

        if (start.current >= totalSize) {
          clearInterval(intervalRef.current);
          setUploading(false);
          setSelectedFile(null);
        }
      }, 1000);

      setUploading(true);
    }
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    setUploading(false);
  };

  const handleResume = () => {
    handleUpload();
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload} disabled={uploading}>
        Upload
      </button>
      <button onClick={handlePause} disabled={!uploading}>
        Pause
      </button>
      <button
        onClick={handleResume}
        disabled={
          !selectedFile || (uploading && start.current >= selectedFile.size)
        }
      >
        Resume
      </button>
      <br />
      {uploading && (
        <div>
          <p>Uploading... {uploadPercentage.toFixed(2)}%</p>
          <progress value={uploadPercentage} max="100" />
        </div>
      )}
      {!uploading && selectedFile && (
        <div>
          <p>Upload Paused at {uploadPercentage.toFixed(2)}%</p>
          <progress value={uploadPercentage} max="100" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;

'use client';

import { useState } from 'react';

interface UploadAreaProps {
  onUploadComplete: (transcript: string, id: string) => void;
  onError: (error: string) => void;
}

export default function UploadArea({ onUploadComplete, onError }: UploadAreaProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('audio/')) {
      onError('Please upload an audio file (MP3 or WAV)');
      return;
    }

    setIsUploading(true);
    onError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUploadComplete(data.transcript, data.id);
    } catch (err) {
      onError('Failed to upload file. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8">
      <input
        type="file"
        accept="audio/mp3,audio/wav"
        onChange={handleFileUpload}
        disabled={isUploading}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className={`cursor-pointer inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
          isUploading
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
        }`}
      >
        {isUploading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Transcribing...
          </>
        ) : (
          'Choose Audio File'
        )}
      </label>
      <p className="mt-2 text-sm text-gray-500">
        MP3 or WAV files only
      </p>
    </div>
  );
} 
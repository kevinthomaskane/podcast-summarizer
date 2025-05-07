'use client';

import { useState } from 'react';
import UploadArea from './upload/UploadArea';
import TranscriptDisplay from './upload/TranscriptDisplay';
import SummaryDisplay from './upload/SummaryDisplay';

export default function FileUpload() {
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [transcriptId, setTranscriptId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const handleUploadComplete = (newTranscript: string, id: string) => {
    setTranscript(newTranscript);
    setTranscriptId(id);
    setSummary(null);
  };

  const handleGenerateSummary = async () => {
    if (!transcript || !transcriptId) return;

    setIsGeneratingSummary(true);
    setError(null);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript, id: transcriptId }),
      });

      if (!response.ok) {
        throw new Error('Summary generation failed');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
      console.error('Summary generation error:', err);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <UploadArea
        onUploadComplete={handleUploadComplete}
        onError={setError}
      />
      
      {error && (
        <p className="text-sm text-red-600 text-center mb-4">{error}</p>
      )}

      {transcript && (
        <>
          <TranscriptDisplay
            transcript={transcript}
            onGenerateSummary={handleGenerateSummary}
            isGeneratingSummary={isGeneratingSummary}
          />

          {summary && <SummaryDisplay summary={summary} />}
        </>
      )}
    </div>
  );
} 
'use client';

import { Transcript } from '@/app/lib/supabase';
import Link from 'next/link';

interface TranscriptCardProps {
  transcript: Transcript;
}

export default function TranscriptCard({ transcript }: TranscriptCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            {transcript.file_name}
          </h2>
          <p className="text-sm text-gray-500">
            {new Date(transcript.created_at).toLocaleDateString()}
          </p>
        </div>
        <Link
          href={`/results/${transcript.id}`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          View
        </Link>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {transcript.transcript}
        </p>
      </div>
      {transcript.summary && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900">Summary</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {transcript.summary}
          </p>
        </div>
      )}
    </div>
  );
} 
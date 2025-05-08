import Link from 'next/link';
import type { Transcript } from '../lib/supabase';

export default function TranscriptCard({
  transcript,
}: {
  transcript: Transcript;
}) {
  return (
    <div
      key={transcript.id}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="font-medium text-gray-900">{transcript.file_name}</h2>
          <p className="text-sm text-gray-500">
            {new Date(transcript.created_at).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {transcript.transcript.slice(0, 100)}...
          </p>
        </div>
        <Link
          href={`/results/${transcript.id}`}
          className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          View
        </Link>
      </div>
    </div>
  );
}

import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';
import { Transcript } from '@/app/lib/supabase';

export default async function HistoryPage() {
  const { data: transcripts } = await supabase
    .from('transcripts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Recent Transcripts</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            New Upload
          </Link>
        </div>

        <div className="space-y-4">
          {transcripts?.map((transcript: Transcript) => (
            <div
              key={transcript.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="font-medium text-gray-900">
                    {transcript.file_name}
                  </h2>
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
          ))}

          {transcripts?.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">No transcripts found</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 
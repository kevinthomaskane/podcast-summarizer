import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';
import FileUpload from '../components/FileUpload';
import type { Transcript } from '@/app/lib/supabase';
import TranscriptCard from '../components/TranscriptCard';

export default async function DashboardPage() {
  const { data: transcripts } = await supabase
    .from('transcripts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  const displayRecentActivity = () => {
    if (transcripts && transcripts.length > 0) {
      return (
        <div className="flex flex-col gap-4">
          {transcripts.map((transcript: Transcript) => (
            <TranscriptCard key={transcript.id} transcript={transcript} />
          ))}
        </div>
      );
    }
    return <p>Your recent transcripts and summaries will appear here</p>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Upload New Podcast
            </h2>
            <FileUpload />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <Link
                href="/history"
                className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View History
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="text-gray-500">
              {displayRecentActivity()}
              <Link
                href="/history"
                className="text-center mt-2 inline-block text-sm text-indigo-600 hover:text-indigo-500"
              >
                View all history →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { supabase } from '@/app/lib/supabase';
import { notFound } from 'next/navigation';
import { Transcript } from '@/app/lib/supabase';
import { CopyButton } from '@/app/components/CopyButton';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResultPage({ params }: PageProps) {
  const { id } = await params;
  const { data } = await supabase
    .from('transcripts')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) {
    notFound();
  }

  const transcript = data as Transcript;
  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {transcript.file_name}
            </h1>
            <p className="text-sm text-gray-500">
              {new Date(transcript.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="p-6 space-y-8">
            {transcript.summary && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Summary
                  </h2>
                  <CopyButton text={transcript.summary} />
                </div>
                <div className="prose max-w-none">
                  {transcript.summary.split('\n').map((line: string, index: number) => (
                    <p key={index} className="mb-2 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Full Transcript
                </h2>
                <CopyButton text={transcript.transcript} />
              </div>
              <div className="prose max-w-none">
                {transcript.transcript.split('\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
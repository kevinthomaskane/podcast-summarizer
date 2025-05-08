'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import type { Transcript } from '@/app/lib/supabase';
import TranscriptList from '../components/transcript/TranscriptList';
import LoadingState from '../components/transcript/LoadingState';
import Link from 'next/link';

const ITEMS_PER_PAGE = 10;

export default function HistoryPage() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTranscripts();
  }, []);

  const fetchTranscripts = async (page = 1) => {
    try {
      setLoading(true);
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      // Fetch the current page of transcripts
      const { data: pageData, error: pageError } = await supabase
        .from('transcripts')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (pageError) throw pageError;

      // Fetch the total count
      const { count, error: countError } = await supabase
        .from('transcripts')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;

      // Update state
      if (page === 1) {
        setTranscripts(pageData);
      } else {
        setTranscripts(prev => [...prev, ...pageData]);
      }
      
      setHasMore(count ? count > to + 1 : false);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching transcripts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchTranscripts(currentPage + 1);
  };

  if (loading && transcripts.length === 0) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transcripts</h1>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            New Upload
          </Link>
        </div>
        
        <TranscriptList
          transcripts={transcripts}
          hasMore={hasMore}
          loading={loading}
          onLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
}


'use client';

interface SummaryDisplayProps {
  summary: string;
}

export default function SummaryDisplay({ summary }: SummaryDisplayProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="prose max-w-none">
          {summary.split('\n').map((line, index) => (
            <p key={index} className="mb-2 last:mb-0">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
} 
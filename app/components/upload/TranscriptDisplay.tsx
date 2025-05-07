'use client';

interface TranscriptDisplayProps {
  transcript: string;
  onGenerateSummary: () => void;
  isGeneratingSummary: boolean;
}

export default function TranscriptDisplay({
  transcript,
  onGenerateSummary,
  isGeneratingSummary,
}: TranscriptDisplayProps) {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transcript</h2>
        <button
          onClick={onGenerateSummary}
          disabled={isGeneratingSummary}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            isGeneratingSummary
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isGeneratingSummary ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Generating Summary...
            </span>
          ) : (
            'Generate Summary'
          )}
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="prose max-w-none">
          {transcript.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
} 
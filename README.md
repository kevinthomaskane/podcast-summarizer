# Podcast Summarizer

A modern web application that transcribes and summarizes podcast episodes using AI. Built with Next.js, Tailwind CSS, and OpenAI's Whisper and GPT models.

## Features

- 🎙️ Upload podcast audio files
- 🎯 Automatic transcription using OpenAI's Whisper
- 📝 AI-powered summary generation
- 💾 Persistent storage with Supabase
- 📱 Clean, responsive UI with Tailwind CSS
- 🔍 Searchable history of past transcripts
- 📋 Copy-to-clipboard functionality
- 🎨 Modern, intuitive interface

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **React Server Components** - For improved performance
- **Client Components** - For interactive features

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **OpenAI API**
  - Whisper - For audio transcription
  - GPT-4 - For generating summaries
- **Supabase**
  - PostgreSQL database
  - Row Level Security
  - Real-time capabilities

### Infrastructure
- **Vercel** - Hosting and deployment
- **Supabase** - Database and storage
- **OpenAI** - AI services

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- OpenAI API key

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

Create a `transcripts` table in your Supabase database with the following schema:

```sql
create table transcripts (
  id uuid default gen_random_uuid() primary key,
  transcript text not null,
  summary text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  file_name text not null
);

-- Enable Row Level Security
alter table transcripts enable row level security;

-- Create policy to allow all operations (you may want to restrict this in production)
create policy "Allow all operations" on transcripts for all using (true);
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/podcast-summarizer.git
cd podcast-summarizer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
podcast-summarizer/
├── app/
│   ├── api/              # API routes
│   │   ├── summarize/    # Summary generation endpoint
│   │   └── upload/       # File upload endpoint
│   ├── components/       # React components
│   ├── history/         # History page
│   ├── results/         # Individual result pages
│   └── layout.tsx       # Root layout
├── public/              # Static assets
└── types/              # TypeScript types
```

## API Endpoints

### POST /api/upload
Handles audio file uploads and transcription.

**Request:**
- `file`: Audio file (mp3, wav, etc.)

**Response:**
```json
{
  "transcript": "string",
  "id": "uuid"
}
```

### POST /api/summarize
Generates a summary from a transcript.

**Request:**
```json
{
  "transcript": "string",
  "id": "uuid"
}
```

**Response:**
```json
{
  "summary": "string"
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

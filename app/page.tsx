import Image from "next/image";
import FileUpload from './components/FileUpload';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Podcast Summarizer
        </h1>
        <FileUpload />
      </div>
    </main>
  );
}

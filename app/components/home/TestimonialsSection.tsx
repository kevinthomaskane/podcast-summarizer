export default function TestimonialsSection() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Loved by podcasters
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold">JD</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">John Doe</h4>
                  <p className="text-gray-500">Tech Podcast Host</p>
                </div>
              </div>
              <p className="text-gray-600">
                "This tool has completely transformed my workflow. I can now focus on creating content while the AI handles the transcription and summarization."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold">SJ</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-500">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The accuracy of the transcriptions is impressive, and the summaries help me quickly identify key points for my show notes."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold">MR</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Mike Roberts</h4>
                  <p className="text-gray-500">Independent Podcaster</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a solo podcaster, this tool has been a game-changer. It saves me hours of work and helps me maintain consistency across episodes."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
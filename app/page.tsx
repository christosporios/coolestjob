import JobListings from "@/components/job-listings"
import Footer from "@/components/footer"
import { jobs } from "@/data/jobs"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <header className="mb-4 md:mb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            coolestjob.gr 🚀
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base">
            💰 <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">Jobs with transparent compensation</span>,
            ✅ <span className="font-bold bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-transparent bg-clip-text">from companies that pass the vibe check</span>,
            📧 <span className="font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">with a single-email application process</span>.
          </p>
        </header>
        <JobListings jobs={jobs} />
      </div>
      <Footer />
    </main>
  )
}

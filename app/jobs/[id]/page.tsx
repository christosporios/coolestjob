import { notFound } from "next/navigation"
import { jobs } from "@/data/jobs"
import JobCard from "@/components/job-card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"

export default function JobPage({ params }: { params: { id: string } }) {
  const job = jobs.find((job) => job.id === params.id)

  if (!job) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all jobs
        </Link>

        <div className="max-w-2xl mx-auto">
          <JobCard job={job} />
        </div>
      </div>
      <Footer />
    </main>
  )
}

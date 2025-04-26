import { notFound } from "next/navigation"
import { jobs } from "@/data/jobs"
import JobCard from "@/components/job-card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import { Metadata, ResolvingMetadata } from "next"
import CopyPermalinkButton from "@/components/copy-permalink-button"

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const job = jobs.find((job) => job.id === params.id)

  if (!job) {
    return {
      title: "Job Not Found - coolestjob.gr",
    }
  }

  return {
    title: `${job.title} at ${job.company} - coolestjob.gr`,
    description: `${job.description.substring(0, 160)}... - ${formatSalary(job.compensation)} - ${job.location}`,
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: job.description,
      images: [{
        url: `/api/og?title=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`,
        width: 1200,
        height: 630,
        alt: `${job.title} at ${job.company}`
      }]
    }
  }
}

function formatSalary(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount)
}

export default function JobPage({ params }: Props) {
  const job = jobs.find((job) => job.id === params.id)

  if (!job) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all jobs
          </Link>

          <CopyPermalinkButton jobId={job.id} />
        </div>

        <div className="max-w-2xl mx-auto">
          <JobCard job={job} />
        </div>
      </div>
      <Footer />
    </main>
  )
}

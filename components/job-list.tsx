"use client"

import { useState } from "react"
import type { JobType } from "@/types/job"
import JobCard from "@/components/job-card"
import { Search, PlusCircle } from "lucide-react"
import Link from "next/link"

interface JobListProps {
  jobs: JobType[]
}

export default function JobList({ jobs }: JobListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <Link
          href="https://github.com/christosporios/coolestjob"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1 text-sm"
        >
          <PlusCircle className="h-4 w-4" /> Add a job
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search jobs, companies, locations... 🔍"
          className="w-full p-4 pl-10 border-2 border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-xl">😢 No jobs found matching your search.</p>
            <p className="text-gray-400 mt-2">Try different keywords or check back later!</p>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import type { JobType } from "@/types/job"
import JobList from "@/components/job-list"
import JobSwipe from "@/components/job-swipe"
import { useMobile } from "@/hooks/use-mobile"
import { ListFilter, Smartphone } from "lucide-react"

interface JobListingsProps {
  jobs: JobType[]
}

export default function JobListings({ jobs }: JobListingsProps) {
  const isMobile = useMobile()
  const [viewMode, setViewMode] = useState<"list" | "swipe">("list")

  useEffect(() => {
    // Set default view based on device
    setViewMode(isMobile ? "swipe" : "list")
  }, [isMobile])

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 rounded-full transition-all transform hover:scale-105 text-sm font-medium flex items-center gap-1 ${
            viewMode === "list"
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-purple-200"
          }`}
        >
          <ListFilter className="h-4 w-4" /> List
        </button>
        <button
          onClick={() => setViewMode("swipe")}
          className={`px-4 py-2 rounded-full transition-all transform hover:scale-105 text-sm font-medium flex items-center gap-1 ${
            viewMode === "swipe"
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-purple-200"
          }`}
        >
          <Smartphone className="h-4 w-4" /> Swipe
        </button>
      </div>

      {viewMode === "list" ? <JobList jobs={jobs} /> : <JobSwipe jobs={jobs} />}
    </div>
  )
}

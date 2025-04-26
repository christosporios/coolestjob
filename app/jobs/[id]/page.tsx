"use client"

import { notFound } from "next/navigation"
import { jobs } from "@/data/jobs"
import JobCard from "@/components/job-card"
import Link from "next/link"
import { ArrowLeft, Copy, Check } from "lucide-react"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import * as React from "react"

export default function JobPage({ params }: { params: { id: string } }) {
  const unwrappedParams = React.use(params)
  const job = jobs.find((job) => job.id === unwrappedParams.id)

  if (!job) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all jobs
          </Link>

          <CopyToClipboard jobId={job.id} />
        </div>

        <div className="max-w-2xl mx-auto">
          <JobCard job={job} />
        </div>
      </div>
      <Footer />
    </main>
  )
}

function CopyToClipboard({ jobId }: { jobId: string }) {
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  // Handle toast visibility
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const copyToClipboard = () => {
    const url = `${window.location.origin}/jobs/${jobId}`
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true)
        setShowToast(true)
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }

  return (
    <div className="relative">
      <Button
        onClick={copyToClipboard}
        className="bg-white border-2 border-purple-300 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy permalink"}
      </Button>

      {showToast && (
        <div className="absolute top-full mt-2 right-0 bg-green-100 border border-green-200 text-green-800 px-3 py-1 rounded-md text-sm animate-fade-in">
          Permalink copied!
        </div>
      )}
    </div>
  )
}

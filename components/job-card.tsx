"use client"

import type React from "react"

import { useState, forwardRef } from "react"
import type { JobType } from "@/types/job"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail, ExternalLink } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
  job: JobType
  onSwipe?: (direction: "left" | "right") => void
  isSwipeCard?: boolean
  dialogRef?: React.RefObject<HTMLButtonElement> | null
}

export default function JobCard({ job, onSwipe, isSwipeCard = false, dialogRef }: JobCardProps) {
  const [name, setName] = useState("")

  const generateEmailBody = () => {
    return `Hi,

I'd like to apply for the role of ${job.title.replace(/^[^ ]+ /, "")} that I saw on coolestjob.gr -- please find my CV attached.

Best,
${name || "<name>"}`
  }

  const handleApply = () => {
    const subject = `Application for ${job.title.replace(/^[^ ]+ /, "")} position`
    const body = encodeURIComponent(generateEmailBody())
    window.open(`mailto:${job.email}?subject=${encodeURIComponent(subject)}&body=${body}`)
  }

  const getLocationEmoji = (location: string) => {
    if (location.includes("Remote")) {
      return "🌐"
    } else if (location.includes("Athens")) {
      return "🏛️"
    }
    return "📍"
  }

  // Create a custom button that can receive a ref
  const ApplyButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
    <Button
      ref={ref}
      className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 font-bold"
      {...props}
    >
      <Mail className="mr-2 h-4 w-4" /> Apply Now 🚀
    </Button>
  ))
  ApplyButton.displayName = "ApplyButton"

  const cardContent = (
    <>
      <CardHeader className="pb-0 pt-4">
        <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
        <div className="flex flex-wrap items-center justify-between mt-1">
          <CardDescription className="text-lg font-medium flex-grow">
            <div className="flex items-center">
              <span>✨</span>
              <span className="mx-1">{job.company}</span>
              <span>✨</span>
            </div>
            <div className="text-sm font-normal text-gray-600 mt-1">{job.companyDescription}</div>
          </CardDescription>
          <div className="flex-shrink-0 ml-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md whitespace-nowrap">
            💰 {formatCurrency(job.compensation)} €/year
          </div>
        </div>
        <div className="flex items-center mt-2 text-gray-600 text-sm">
          <span className="mr-1">{getLocationEmoji(job.location)}</span>
          <span>{job.location}</span>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-gray-700">{job.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-0 pb-4">
        <Dialog>
          <DialogTrigger asChild>
            <ApplyButton ref={dialogRef || undefined} />
          </DialogTrigger>
          <DialogContent className="bg-white rounded-xl border-4 border-purple-400 max-w-md w-full">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                ✉️ Apply to {job.title} at {job.company} ✉️
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name 👋
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-2 border-2 border-purple-300 rounded-md focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Preview ✨</label>
                <div className="p-3 bg-yellow-50 rounded-md whitespace-pre-wrap border-2 border-yellow-200">
                  {generateEmailBody()}
                </div>
              </div>
              <Button
                onClick={handleApply}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              >
                📧 Open Email Client & Apply 📧
              </Button>
              <p className="text-center mt-3 text-gray-600">
                or send the above email to <span className="font-bold text-purple-600">{job.email}</span> ✉️
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex flex-wrap gap-2 w-full">
          <Link
            href={`/${job.id}`}
            className="text-purple-600 hover:text-purple-800 font-medium flex items-center justify-center gap-1 text-sm flex-1 min-w-[140px]"
          >
            <ExternalLink className="h-4 w-4" /> View Permalink
          </Link>

          {job.externalLink && (
            <Link
              href={job.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1 text-sm flex-1 min-w-[140px]"
            >
              <ExternalLink className="h-4 w-4" /> Full Job Post
            </Link>
          )}
        </div>
      </CardFooter>
    </>
  )

  if (isSwipeCard) {
    return (
      <Card className="w-full max-w-md mx-auto h-[500px] flex flex-col border-4 border-purple-300 rounded-xl shadow-lg">
        <div className="flex flex-col h-full">
          <CardHeader className="pb-0 pt-3 space-y-2">
            <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
            <div className="flex flex-wrap items-center justify-between">
              <CardDescription className="text-lg font-medium flex-grow">
                <div className="flex items-center">
                  <span>✨</span>
                  <span className="mx-1">{job.company}</span>
                  <span>✨</span>
                </div>
                <div className="text-sm font-normal text-gray-600 mt-1">{job.companyDescription}</div>
              </CardDescription>
              <div className="flex-shrink-0 ml-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md whitespace-nowrap">
                💰 {formatCurrency(job.compensation)} €/year
              </div>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-1">{getLocationEmoji(job.location)}</span>
              <span>{job.location}</span>
            </div>
          </CardHeader>

          <CardContent className="py-2 overflow-y-auto flex-1">
            <p className="text-gray-700">{job.description}</p>
          </CardContent>

          <div className="px-6 pb-4 pt-2 mt-auto">
            <Dialog>
              <DialogTrigger asChild>
                <ApplyButton ref={dialogRef || undefined} />
              </DialogTrigger>
              <DialogContent className="bg-white rounded-xl border-4 border-purple-400 max-w-md w-full">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl">
                    ✉️ Apply to {job.title} at {job.company} ✉️
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name 👋
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      className="w-full p-2 border-2 border-purple-300 rounded-md focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Preview ✨</label>
                    <div className="p-3 bg-yellow-50 rounded-md whitespace-pre-wrap border-2 border-yellow-200">
                      {generateEmailBody()}
                    </div>
                  </div>
                  <Button
                    onClick={handleApply}
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                  >
                    📧 Open Email Client & Apply 📧
                  </Button>
                  <p className="text-center mt-3 text-gray-600">
                    or send the above email to <span className="font-bold text-purple-600">{job.email}</span> ✉️
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-4 border-purple-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 transition-transform">
      {cardContent}
    </Card>
  )
}

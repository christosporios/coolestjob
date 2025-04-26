"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CopyPermalinkButtonProps {
    jobId: string
}

export default function CopyPermalinkButton({ jobId }: CopyPermalinkButtonProps) {
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
        const url = `${window.location.origin}/${jobId}`
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
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function EmailSignup() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            setStatus("error")
            setErrorMessage("Please enter your email")
            return
        }

        try {
            setStatus("loading")
            const response = await fetch("/api/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })

            if (!response.ok) {
                throw new Error("Failed to subscribe")
            }

            setStatus("success")
            setEmail("")
        } catch (err) {
            setStatus("error")
            setErrorMessage("Something went wrong. Please try again.")
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto">
            {status === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 text-green-700 text-center">
                    ✅ Thanks for subscribing! We'll send updates to your inbox.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-grow">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            disabled={status === "loading"}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-medium"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Subscribing..." : "Get Updates"}
                    </Button>
                </form>
            )}
            {status === "error" && (
                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
            )}
        </div>
    )
} 
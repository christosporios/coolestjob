import Link from "next/link"
import { PlusCircle, Mail } from "lucide-react"
import EmailSignup from "@/components/email-signup"

export default function Footer() {
  return (
    <footer className="bg-purple-100 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 max-w-xl mx-auto">
          <h3 className="text-purple-800 font-medium mb-3 text-center">
            Stay updated with new opportunities ✨
          </h3>
          <EmailSignup />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-purple-200">
          <div className="mb-4 md:mb-0">
            <p className="text-purple-800 font-medium">© {new Date().getFullYear()} coolestjob.gr</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <Link
              href="https://github.com/christosporios/coolestjob"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" /> Add a job
            </Link>

            <Link
              href="mailto:hello@coolestjob.gr"
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
            >
              <Mail className="h-4 w-4" /> hello@coolestjob.gr
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

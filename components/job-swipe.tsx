"use client"

import { useState, useRef, useEffect } from "react"
import { motion, type PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion"
import type { JobType } from "@/types/job"
import JobCard from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react"

interface JobSwipeProps {
  jobs: JobType[]
}

export default function JobSwipe({ jobs }: JobSwipeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const controls = useAnimation()
  const dialogButtonRef = useRef<HTMLButtonElement>(null)

  // Motion values for more natural animations
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30])

  // Reset position when current index changes
  useEffect(() => {
    x.set(0)
    y.set(0)
  }, [currentIndex, x, y])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100
    const velocity = info.velocity.x

    if (info.offset.x > threshold || velocity > 500) {
      // Swiped right with enough distance or velocity
      swipeRight()
    } else if (info.offset.x < -threshold || velocity < -500) {
      // Swiped left with enough distance or velocity
      swipeLeft()
    } else {
      // Reset position with a spring animation
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        },
      })
    }
  }

  const swipeLeft = () => {
    // Animate card off screen to the left
    controls
      .start({
        x: "-200vw",
        rotate: -30,
        opacity: 0,
        transition: {
          duration: 0.5,
          type: "spring",
          damping: 15,
        },
      })
      .then(() => {
        moveToNextCard()
      })
  }

  const swipeRight = () => {
    // Animate card off screen to the right
    controls
      .start({
        x: "200vw",
        rotate: 30,
        opacity: 0,
        transition: {
          duration: 0.5,
          type: "spring",
          damping: 15,
        },
      })
      .then(() => {
        // After animation completes, open the dialog
        if (dialogButtonRef.current) {
          dialogButtonRef.current.click()
        }

        // Reset position after a short delay
        setTimeout(() => {
          controls.start({
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            transition: { duration: 0 },
          })
        }, 300)
      })
  }

  const moveToNextCard = () => {
    // Move to next card or loop back to beginning
    if (currentIndex === jobs.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }

    // Reset position for next card
    controls.start({
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: { duration: 0 },
    })
  }

  const resetCards = () => {
    setCurrentIndex(0)
    controls.start({
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    })
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500 mb-4 text-xl">😢 No jobs available.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {/* Full-width container that spans the entire viewport */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}></div>

      {/* Card container with centered card but full-width dragging area */}
      <div className="relative w-full h-[520px] flex justify-center items-center">
        <motion.div
          drag
          dragElastic={0.9}
          style={{ x, y, rotate }}
          onDragEnd={handleDragEnd}
          animate={controls}
          whileDrag={{ scale: 1.02, cursor: "grabbing" }}
          className="absolute w-full max-w-md cursor-grab z-10"
        >
          <JobCard
            job={jobs[currentIndex]}
            isSwipeCard={true}
            dialogRef={dialogButtonRef as React.RefObject<HTMLButtonElement>}
          />
        </motion.div>
      </div>

      <div className="flex gap-4 mt-6 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={swipeLeft}
          className="h-16 w-16 rounded-full bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600 border-2 border-red-300 shadow-md"
        >
          <ThumbsDown className="h-8 w-8" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={resetCards}
          className="h-12 w-12 rounded-full border-2 border-purple-300 shadow-md"
        >
          <RefreshCw className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={swipeRight}
          className="h-16 w-16 rounded-full bg-green-100 text-green-500 hover:bg-green-200 hover:text-green-600 border-2 border-green-300 shadow-md"
        >
          <ThumbsUp className="h-8 w-8" />
        </Button>
      </div>

      <div className="mt-4 text-lg font-bold text-purple-600 z-20">
        🔍 {currentIndex + 1} of {jobs.length} jobs
      </div>
    </div>
  )
}

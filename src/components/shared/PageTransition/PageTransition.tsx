"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { pageTransition } from "@/lib/animations"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [pathname])

  if (!isClient) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={
          shouldReduceMotion
            ? {
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { duration: 0.2 } },
                exit: { opacity: 0, transition: { duration: 0.15 } },
              }
            : pageTransition
        }
        style={{
          willChange: shouldReduceMotion ? "opacity" : "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

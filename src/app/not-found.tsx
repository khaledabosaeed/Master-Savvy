"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home } from "lucide-react"


export default function NotFound() {
    // const { language } = useLanguage()
    // const lang = language as "en" | "ar"
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/" className="inline-block">
            <div className="text-3xl font-bold text-gray-900">
              Savvy
            </div>
          </Link>
        </motion.div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-12"
        >
          <motion.h1
            className="text-[180px] md:text-[280px] lg:text-[350px] font-black leading-none select-none"
            style={{
              background: "linear-gradient(135deg, #3960F9 0%, #1E40AF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 10px 40px rgba(57, 96, 249, 0.2)",
            }}
          >
            404
          </motion.h1>
          
          {/* Decorative elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#3960F9]/10 rounded-full blur-3xl -z-10"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sorry, the page you are trying to access has been moved, deleted, or doesn&apos;t exist.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#3960F9] text-white rounded-xl font-bold text-lg hover:bg-[#2848C7] transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
            >
              <Home className="w-5 h-5" />
              <span>Back to Homepage</span>
            </motion.button>
          </Link>

          <Link href="ar/contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-xl font-bold text-lg hover:border-[#3960F9] hover:text-[#3960F9] transition-all"
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#3960F9]/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#3960F9]/10 rounded-full blur-2xl"
          />
        </div>
      </div>
      {/* <UnifiedFooter lang={lang} /> */}

    </div>
  )
}


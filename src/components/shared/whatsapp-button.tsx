"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface WhatsAppButtonProps {
    phoneNumber: string
    message?: string
}

export function WhatsAppButton({ phoneNumber, message }: WhatsAppButtonProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const { language } = useLanguage()

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)

        // Show tooltip after 3 seconds
        const timer = setTimeout(() => {
            setShowTooltip(true)
            setTimeout(() => setShowTooltip(false), 5000)
        }, 3000)

        return () => {
            window.removeEventListener("scroll", toggleVisibility)
            clearTimeout(timer)
        }
    }, [])

    const isRTL = language === "ar"
    
    // Default messages based on language
    const defaultMessage = isRTL 
        ? "مرحباً! أرغب في الاستفسار عن خدماتكم."
        : "Hello! I'm interested in learning more about your services."
    
    const finalMessage = message || defaultMessage

    const handleClick = () => {
        const formattedMessage = encodeURIComponent(finalMessage)
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${formattedMessage}`
        window.open(whatsappUrl, "_blank")
    }

    const tooltipText = isRTL ? "هل تحتاج مساعدة؟ تواصل معنا" : "Need help? Contact us"
    const ariaLabel = isRTL ? "تواصل معنا على واتساب" : "Contact us on WhatsApp"

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`fixed bottom-6 z-[999] flex items-center gap-3 ${
                        isRTL ? "left-6" : "right-6"
                    }`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                    dir={isRTL ? "rtl" : "ltr"}
                >
                    {/* Tooltip */}
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                className={`px-4 py-2 bg-white text-gray-900 rounded-lg shadow-lg whitespace-nowrap ${
                                    isRTL ? "font-almarai" : "font-poppins"
                                }`}
                                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative">
                                    {tooltipText}
                                    <button
                                        onClick={() => setShowTooltip(false)}
                                        className={`absolute -top-1 text-gray-600 hover:text-gray-700 ${
                                            isRTL ? "-left-1" : "-right-1"
                                        }`}
                                        aria-label={isRTL ? "إغلاق" : "Close"}
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* WhatsApp Button */}
                    <motion.button
                        onClick={handleClick}
                        className="relative group w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={ariaLabel}
                    >
                        {/* Pulse Animation */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-[#25D366]"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.7, 0, 0.7]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Icon */}
                        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-black relative z-10" />

                        {/* Notification Badge */}
                        <motion.div
                            className={`absolute -top-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center ${
                                isRTL ? "-left-1" : "-right-1"
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <span className="text-black text-xs font-bold">1</span>
                        </motion.div>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

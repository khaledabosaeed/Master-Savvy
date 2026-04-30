"use client"

interface BadgeProps {
    text: string
    variant?: "primary" | "secondary"
}

export default function Badge({ text, variant = "primary" }: BadgeProps) {
    const bgColor = variant === "primary" ? "bg-[#0066FF]" : "bg-gray-500"

    return (
        <span className={`${bgColor} text-white text-xs px-2 py-0.5 rounded ml-1 mr-1`}>
            {text}
        </span>
    )
}

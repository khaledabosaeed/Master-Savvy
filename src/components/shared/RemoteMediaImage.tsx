"use client"

import Image from "next/image"
import { isNextOptimizedImageUrl } from "@/lib/media-url"

type RemoteMediaImageProps = {
  src: string
  alt: string
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
}

export default function RemoteMediaImage({
  src,
  alt,
  className,
  fill,
  sizes,
  priority,
}: RemoteMediaImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      unoptimized={!isNextOptimizedImageUrl(src)}
      className={className}
    />
  )
}

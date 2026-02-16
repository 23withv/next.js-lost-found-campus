"use client"

import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StandardImageProps {
  src?: string
  alt?: string
  aspectRatio?: "card" | "video" | "square"
  className?: string
}

export function StandardImage({ 
  src, 
  alt = "Item image", 
  aspectRatio = "card",
  className 
}: StandardImageProps) {

  const paddingBottom = {
    card: "75%",
    video: "56.25%",
    square: "100%"
  }[aspectRatio]

  return (
    <div 
      className={cn("relative w-full bg-muted overflow-hidden", className)}
      style={{ height: 0, paddingBottom: paddingBottom }} 
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw" 
          priority={false}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/30">
          <ImageOff className="h-10 w-10" />
          <span className="text-[10px] font-bold uppercase">No Image Provided</span>
        </div>
      )}
    </div>
  )
}
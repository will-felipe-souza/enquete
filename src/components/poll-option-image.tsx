import Image from "next/image"

interface PollOptionImageProps {
  imageUrl: string | null
  alt?: string
}

export function PollOptionImage({
  imageUrl,
  alt = "Imagem da opção",
}: PollOptionImageProps) {
  if (!imageUrl) return null

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-lg border">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )
}

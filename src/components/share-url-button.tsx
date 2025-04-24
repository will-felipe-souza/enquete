"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ShareUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={url}
        readOnly
        className="flex-1 px-3 py-2 border rounded-md text-sm"
      />
      <Button variant="outline" onClick={handleCopy}>
        {copied ? "Copiado!" : "Copiar"}
      </Button>
    </div>
  )
}

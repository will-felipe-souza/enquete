"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"
import { X } from "lucide-react"
import { createPoll } from "@/app/actions/polls"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Image from "next/image"
import { genUploader } from "uploadthing/client"

type Option = {
  text: string
  image?: File | null
}

export default function NewPoll() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [options, setOptions] = useState<Option[]>([
    { text: "", image: null },
    { text: "", image: null },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, { text: "", image: null }])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOptionText = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index].text = value
    setOptions(newOptions)
  }

  const updateOptionImage = (index: number, file: File | null) => {
    const newOptions = [...options]
    newOptions[index].image = file
    setOptions(newOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("O título é obrigatório")
      return
    }

    if (options.some((opt) => !opt.text.trim())) {
      toast.error("Todas as opções devem ter texto")
      return
    }

    try {
      setIsSubmitting(true)

      const uploader = genUploader()

      const uploadedImageUrls: (string | null)[] = await Promise.all(
        options.map(async (opt) => {
          if (!opt.image) return null

          const res = await uploader.uploadFiles("imageUploader", {
            files: [opt.image],
          })

          return res[0]?.url ?? null
        })
      )

      const result = await createPoll({
        title,
        description: description || undefined,
        options: options.map((opt, index) => ({
          text: opt.text.trim(),
          imageUrl: uploadedImageUrls[index] ?? undefined,
        })),
      })

      if (result.success) {
        toast.success("Enquete criada com sucesso!")
        router.push("/")
      } else {
        toast.error("Erro ao criar enquete")
      }
    } catch {
      toast.error("Erro ao criar enquete")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Criar Nova Enquete</h1>
          <Link href="/">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informações da Enquete</CardTitle>
              <CardDescription>
                Preencha os detalhes da sua nova enquete
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Título
                </label>
                <Input
                  id="title"
                  placeholder="Digite o título da enquete"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Descrição
                </label>
                <Textarea
                  id="description"
                  placeholder="Digite a descrição da enquete"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Opções</label>
                <div className="space-y-4">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="space-y-2 border p-4 rounded-md"
                    >
                      <div className="flex gap-2 items-center">
                        <Input
                          placeholder={`Opção ${index + 1}`}
                          value={option.text}
                          onChange={(e) =>
                            updateOptionText(index, e.target.value)
                          }
                          required
                        />
                        {options.length > 2 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeOption(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null
                          updateOptionImage(index, file)
                        }}
                      />
                      {option.image && (
                        <div className="mt-2">
                          <Image
                            width={300}
                            height={300}
                            src={URL.createObjectURL(option.image)}
                            alt="Preview"
                            className="max-h-32 object-contain rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={addOption}
                    disabled={options.length >= 4}
                  >
                    Adicionar Opção
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Criando..." : "Criar Enquete"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </main>
  )
}

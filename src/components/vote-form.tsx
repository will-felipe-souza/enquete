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
import { vote } from "@/app/actions/polls"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Option {
  id: string
  title: string
  votes: number
  percentage: number
  _count: {
    votes: number
  }
  createdAt: Date
  updatedAt: Date
  pollId: string
}

interface Poll {
  id: string
  title: string
  description: string | null
  options: Option[]
  createdAt: Date
  updatedAt: Date
  totalVotes: number
  _count: {
    votes: number
  }
}

interface VoteFormProps {
  poll: Poll
}

export function VoteForm({ poll }: VoteFormProps) {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleVote = async () => {
    if (!selectedOption) {
      toast.error("Selecione uma opção para votar")
      return
    }

    try {
      setIsSubmitting(true)
      const result = await vote(poll.id, selectedOption)

      if (result.success) {
        toast.success("Voto registrado com sucesso!")
        router.push(`/polls/${poll.id}`)
      } else {
        toast.error("Erro ao registrar voto")
      }
    } catch {
      toast.error("Erro ao registrar voto")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{poll.title}</CardTitle>
        {poll.description && (
          <CardDescription>{poll.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedOption}
          onValueChange={setSelectedOption}
          className="space-y-3"
        >
          {poll.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id}>{option.title}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleVote} disabled={isSubmitting}>
          {isSubmitting ? "Registrando voto..." : "Votar"}
        </Button>
      </CardFooter>
    </Card>
  )
}

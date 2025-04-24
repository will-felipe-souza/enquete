import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getPollDetails } from "@/app/actions/polls"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Progress } from "@/components/ui/progress"
import { Share2 } from "lucide-react"
import QRCode from "qrcode"
import Image from "next/image"
import { ShareUrlButton } from "@/components/share-url-button"

interface PageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PollDetails({ params }: PageProps) {
  const { success, data: poll } = await getPollDetails(params.id)

  if (!success || !poll) {
    notFound()
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/polls/${poll.id}/vote`
  const qrCodeDataUrl = await QRCode.toDataURL(shareUrl)

  return (
    <main className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Detalhes da Enquete</h1>
          <Link href="/">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{poll.title}</CardTitle>
              {poll.description && (
                <CardDescription>{poll.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Criada{" "}
                {formatDistanceToNow(new Date(poll.createdAt), {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </div>

              <div className="text-sm font-medium">
                Total de votos: {poll.totalVotes}
              </div>

              <div className="space-y-4">
                {poll.options.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{option.title}</span>
                      <span>
                        {option.votes} votos ({option.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={option.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Compartilhar
              </CardTitle>
              <CardDescription>
                Compartilhe o link ou QR code para que outras pessoas possam
                votar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ShareUrlButton url={shareUrl} />

              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-xl">
                  <Image
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/polls/${poll.id}/vote`} className="w-full">
                <Button className="w-full">Ir para página de votação</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}

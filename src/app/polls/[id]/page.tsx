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
import { Share2 } from "lucide-react"
import QRCode from "qrcode"
import Image from "next/image"
import { ShareUrlButton } from "@/components/share-url-button"
import { PollOptionImage } from "@/components/poll-option-image"
import { Progress } from "@/components/ui/progress"
import { currentUser } from "@clerk/nextjs/server"

export default async function PollDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { success, data: poll } = await getPollDetails(id)

  if (!success || !poll) {
    notFound()
  }

  const authIser = await currentUser()

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/polls/${poll.id}/vote`
  const qrCodeDataUrl = await QRCode.toDataURL(shareUrl)

  return (
    <main className="container mx-auto py-10">
      <div
        className={`${
          poll.options.length === 2 ? "max-w-3xl" : "max-w-5xl"
        } mx-auto`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Detalhes da Enquete</h1>
          {authIser && (
            <>
              <Link href="/polls">
                <Button variant="outline">Voltar</Button>
              </Link>
            </>
          )}
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
              <div className="space-y-4">
                {poll.options.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <div className="text-sm font-medium">{option.title}</div>

                    <div className="flex justify-between text-sm">
                      <span>{option.percentage.toFixed(1)}%</span>
                    </div>

                    <Progress value={option.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {authIser && (
            <>
              <Card className="bg-[#00b140]">
                <CardHeader>
                  <CardTitle>Resultado para a Live</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm font-medium">
                    Total de votos: {poll.totalVotes}
                  </div>
                  <div
                    className={`grid ${
                      poll.options.length === 2 ? "grid-cols-2" : "grid-cols-3"
                    } gap-4`}
                  >
                    {poll.options.map((option) => (
                      <div
                        key={option.id}
                        className="items-center gap-1 p-2 rounded-lg bg-[#00b140]"
                      >
                        <div className="text-center font-medium text-2xl bg-white rounded-lg mb-2">
                          {option.title}
                        </div>

                        <div className="grid grid-cols-12 items-center bg-[#00000090] rounded-lg">
                          <div className="col-span-7">
                            <PollOptionImage
                              imageUrl={option.imageUrl}
                              alt={option.title}
                            />
                          </div>

                          <span className="ml-2 text-5xl text-white font-semibold col-span-5 flex justify-center">
                            {option.percentage.toFixed()}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
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

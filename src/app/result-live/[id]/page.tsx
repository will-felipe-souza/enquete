import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getPollDetails } from "@/app/actions/polls"
import { notFound, redirect } from "next/navigation"
import { PollOptionImage } from "@/components/poll-option-image"
import { currentUser } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ResultLive({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { success, data: poll } = await getPollDetails(id)

  if (!success || !poll) {
    notFound()
  }

  const authUser = await currentUser()

  // Redireciona se não estiver autenticado
  if (!authUser) {
    redirect(`/polls/${id}`)
  }

  return (
    <main className="py-10">
      <div className="w-full flex flex-col items-center">
        <div className="w-[1200px] flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Resultado Live - {poll.title}</h1>
          <Link href={`/polls/${id}`}>
            <Button variant="outline">Voltar para detalhes</Button>
          </Link>
        </div>

        <Card className="bg-[#00b140] w-[1200px]">
          <CardHeader>
            <CardTitle>Resultado para a Live</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm font-medium">
              Total de votos: {poll.totalVotes}
            </div>
            <div
              className={`grid gap-4 ${
                poll.options.length === 2 ? "grid-cols-2" :
                poll.options.length === 3 ? "grid-cols-3" :
                poll.options.length === 4 ? "grid-cols-4" :
                poll.options.length === 5 ? "grid-cols-5" :
                poll.options.length === 6 ? "grid-cols-6" :
                "grid-cols-1"
              }`}
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
      </div>
    </main>
  )
}
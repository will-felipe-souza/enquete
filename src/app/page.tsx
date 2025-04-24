import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { getPolls } from "./actions/polls"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export default async function Home() {
  const { data: polls = [] } = await getPolls()

  return (
    <main className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Enquetes</h1>
        <Link href="/polls/new">
          <Button>Criar Nova Enquete</Button>
        </Link>
      </div>

      {polls.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nenhuma enquete encontrada</CardTitle>
            <CardDescription>
              Crie sua primeira enquete clicando no botão acima!
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {polls.map((poll) => (
            <Card key={poll.id}>
              <CardHeader>
                <CardTitle className="line-clamp-1">{poll.title}</CardTitle>
                {poll.description && (
                  <CardDescription className="line-clamp-2">
                    {poll.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Criada{" "}
                  {formatDistanceToNow(new Date(poll.createdAt), {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/polls/${poll.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Ver Detalhes
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}

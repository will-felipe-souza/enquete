import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VoteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <main className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Votar na Enquete</h1>
          <Link href={`/polls/${params.id}`}>
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>

        {children}
      </div>
    </main>
  )
}

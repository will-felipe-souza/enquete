import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function VoteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <main className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Votar na Enquete</h1>
          <Link href={`/polls/${id}`}>
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>

        {children}
      </div>
    </main>
  )
}

import { getPollDetails } from "@/app/actions/polls"
import { notFound } from "next/navigation"
import { VoteForm } from "@/components/vote-form"

export default async function VotePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { success, data: poll } = await getPollDetails(id)

  if (!success || !poll) {
    notFound()
  }

  return (
    <main className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        {/* BANNER SUPERIOR */}
        <div className="mb-6 p-4 bg-red-500 text-white text-center rounded-lg">
          <div className="text-sm font-bold">BANNER SUPERIOR - VOTAÇÃO</div>
          <div className="text-xs">728x90 (Desktop) / 320x50 (Mobile)</div>
        </div>

        <VoteForm poll={poll} />

        {/* BANNER INFERIOR */}
        <div className="mt-6 p-4 bg-green-500 text-white text-center rounded-lg">
          <div className="text-sm font-bold">BANNER INFERIOR - VOTAÇÃO</div>
          <div className="text-xs">728x90 (Desktop) / 320x50 (Mobile)</div>
        </div>
      </div>
    </main>
  )
}

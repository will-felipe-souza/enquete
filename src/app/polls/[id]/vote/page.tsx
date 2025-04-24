import { getPollDetails } from "@/app/actions/polls"
import { notFound } from "next/navigation"
import { VoteForm } from "@/components/vote-form"

export default async function VotePage({ params }: { params: { id: string } }) {
  const { success, data: poll } = await getPollDetails(params.id)

  if (!success || !poll) {
    notFound()
  }

  return <VoteForm poll={poll} />
}

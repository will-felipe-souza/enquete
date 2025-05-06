"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getPolls() {
  try {
    const polls = await prisma.poll.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return { success: true, data: polls }
  } catch (error) {
    console.error("Error fetching polls:", error)
    return { success: false, error: "Failed to fetch polls" }
  }
}

export async function createPoll(data: {
  title: string
  description?: string
  options: {
    text: string
    imageUrl?: string
  }[]
}) {
  try {
    const poll = await prisma.poll.create({
      data: {
        title: data.title,
        description: data.description,
        options: {
          create: data.options.map((opt) => ({
            title: opt.text,
            imageUrl: opt.imageUrl,
          })),
        },
      },
      include: {
        options: true,
      },
    })

    revalidatePath("/polls")
    return { success: true, data: poll }
  } catch (error) {
    console.error("Error creating poll:", error)
    return { success: false, error: "Failed to create poll" }
  }
}

export async function getPollDetails(id: string) {
  try {
    const poll = await prisma.poll.findUnique({
      where: { id },
      include: {
        options: {
          include: {
            _count: {
              select: { votes: true },
            },
          },
        },
        _count: {
          select: { votes: true },
        },
      },
    })

    if (!poll) {
      return { success: false, error: "Poll not found" }
    }

    const optionsWithStats = poll.options.map((option) => ({
      ...option,
      votes: option._count.votes,
      percentage:
        poll._count.votes > 0
          ? (option._count.votes / poll._count.votes) * 100
          : 0,
    }))

    return {
      success: true,
      data: {
        ...poll,
        options: optionsWithStats,
        totalVotes: poll._count.votes,
      },
    }
  } catch (error) {
    console.error("Error fetching poll details:", error)
    return { success: false, error: "Failed to fetch poll details" }
  }
}

export async function vote(pollId: string, optionId: string) {
  try {
    await prisma.vote.create({
      data: {
        pollId,
        optionId,
      },
    })

    revalidatePath(`/polls/${pollId}`)
    return { success: true }
  } catch (error) {
    console.error("Error voting:", error)
    return { success: false, error: "Failed to submit vote" }
  }
}

export async function deletePoll(id: string) {
  try {
    await prisma.poll.delete({
      where: {
        id,
      },
    })

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error deleting poll:", error)
    return { success: false, error: "Failed to delete poll" }
  }
}

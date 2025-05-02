import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher(["/polls", "/polls/new"])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/", req.url)) // Redireciona para a página inicial
  }
  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}

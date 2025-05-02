import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Home() {
  const authUser = await currentUser()

  if (authUser) redirect("/polls")

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-green-700 tracking-wide">
          Bem-vindo à Enquete
        </h1>
        <p className="text-gray-600 text-center text-sm">
          Crie sua enquete e acompanhe as opniões!
        </p>
        <SignInButton mode="modal">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors">
            Entrar
          </Button>
        </SignInButton>
      </div>
    </div>
  )
}

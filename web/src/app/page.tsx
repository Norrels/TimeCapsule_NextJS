import { Copyright } from "@/components/copyright";
import { EmptyMemories } from "@/components/EmptyMemories";
import { Hero } from "@/components/Hero";
import { SignIn } from "@/components/SignIn";

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="relative flex flex-col items-start justify-between overflow-hidden bg-[url(../images/bg-stars.svg)] px-28 py-16">
        <div className="absolute right-0 top-1/2 h-[280px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
        <div className="absolute bottom-0 right-0 top-0 w-2 border-r border-white/10 bg-stripes" />

        <SignIn />
        <Hero />
        <Copyright />
      </div>

      <div className="flex flex-col bg-[url(../images/bg-stars.svg)] bg-cover p-16">
        <EmptyMemories />
      </div>
    </main>
  );
}

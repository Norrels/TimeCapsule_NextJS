import Link from "next/link";

export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança, comece a{" "}
        <Link href="/memories/new" className="hover:gray-50 underline">
          criar agora!
        </Link>
      </p>
    </div>
  );
}

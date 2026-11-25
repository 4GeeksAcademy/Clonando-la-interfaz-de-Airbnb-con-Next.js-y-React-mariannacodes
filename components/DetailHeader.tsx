import Link from "next/link";

interface DetailHeaderProps {
  title: string;
}

const DetailHeader = ({ title }: DetailHeaderProps) => (
  <header className="flex items-center justify-between gap-3 rounded-b-3xl bg-brand px-5 py-4 text-white">
    <Link href="/" aria-label="Volver al inicio" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50">←</Link>
    <h1 className="truncate text-center font-semibold">{title}</h1>
    <button type="button" aria-label="Compartir" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50">⬆️</button>
  </header>
);

export default DetailHeader;

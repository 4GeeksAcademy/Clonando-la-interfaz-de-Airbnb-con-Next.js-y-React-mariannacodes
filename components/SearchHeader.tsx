import Link from "next/link";

interface SearchHeaderProps {
  query: string;
  onChange: (v: string) => void;
}

const SearchHeader = ({ query, onChange }: SearchHeaderProps) => (
  <header className="flex items-center gap-3 rounded-b-3xl bg-brand px-5 pb-10 pt-6">
    <Link href="/" aria-label="Volver al inicio" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 text-white">←</Link>
    <input type="search" placeholder="Buscar destino…" value={query} onChange={(event) => onChange(event.target.value)}
      className="min-w-0 flex-1 rounded-full bg-white/90 px-4 py-2 text-gray-900 outline-none" />
    <button type="button" aria-label="Filtros" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 text-white">⚙️</button>
  </header>
);

export default SearchHeader;

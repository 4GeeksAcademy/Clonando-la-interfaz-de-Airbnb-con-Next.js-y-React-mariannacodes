import Image from "next/image";
import Link from "next/link";

interface HomeHeaderProps {
  userName: string;
  location: string;
}

const HomeHeader = ({ userName, location }: HomeHeaderProps) => (
  <header className="flex items-center justify-between rounded-b-3xl bg-brand px-5 pb-10 pt-6 text-white">
    <div className="flex items-center gap-3">
      <Image src="https://randomuser.me/api/portraits/women/5.jpg" alt="Foto de perfil de Marianna" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
      <div>
        <p className="font-semibold">Hola, {userName}</p>
        <p className="text-sm">📍 {location}</p>
      </div>
    </div>
    <div className="flex gap-2">
      <Link href="/search" aria-label="Buscar" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50">🔍</Link>
      <button type="button" aria-label="Notificaciones" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50">🔔</button>
    </div>
  </header>
);

export default HomeHeader;

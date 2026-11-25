import Link from "next/link";

const MapButton = () => (
  <Link href="/search" className="fixed bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg md:hidden">
    🗺️ Mapa
  </Link>
);

export default MapButton;

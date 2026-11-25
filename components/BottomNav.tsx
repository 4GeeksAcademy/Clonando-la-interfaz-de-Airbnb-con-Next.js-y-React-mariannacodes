const BottomNav = () => (
  <nav aria-label="Navegación principal" className="fixed inset-x-0 bottom-0 flex justify-around border-t bg-white py-3 md:hidden">
    <button type="button" aria-current="page" className="flex flex-col items-center gap-1 text-xs text-gray-900">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">⌂</span>
      Explorar
    </button>
    <button type="button" aria-label="Favoritos" className="text-xl">❤️</button>
    <button type="button" aria-label="Mensajes" className="text-xl">💬</button>
    <button type="button" aria-label="Perfil" className="text-xl">👤</button>
  </nav>
);

export default BottomNav;

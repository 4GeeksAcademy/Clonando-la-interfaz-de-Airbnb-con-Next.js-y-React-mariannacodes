interface MapPlaceholderProps {
  label?: string;
}

const MapPlaceholder = ({ label = "20 min (25.7 km) · Tráfico normal" }: MapPlaceholderProps) => (
  <div role="img" aria-label="Mapa de alojamientos" className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-gray-200 bg-[linear-gradient(0deg,transparent_24%,#ffffff80_25%,#ffffff80_26%,transparent_27%,transparent_74%,#ffffff80_75%,#ffffff80_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,#ffffff80_25%,#ffffff80_26%,transparent_27%,transparent_74%,#ffffff80_75%,#ffffff80_76%,transparent_77%,transparent)] bg-[size:48px_48px] lg:h-[calc(100vh-8rem)]">
    <span className="text-4xl" aria-hidden="true">📍</span>
    <p className="absolute bottom-4 rounded-xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">{label}</p>
  </div>
);

export default MapPlaceholder;

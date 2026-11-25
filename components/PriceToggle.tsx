interface PriceToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

const PriceToggle = ({ enabled, onToggle }: PriceToggleProps) => (
  <section className="mx-5 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
    <div>
      <p className="font-semibold text-gray-900">Mostrar precio total</p>
      <p className="text-sm text-gray-500">Incluye tasas, antes de impuestos</p>
    </div>
    <button type="button" role="switch" aria-checked={enabled} aria-label="Mostrar precio total" onClick={onToggle}
      className={`relative h-7 w-12 rounded-full transition-colors ${enabled ? "bg-brand" : "bg-gray-300"}`}>
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  </section>
);

export default PriceToggle;

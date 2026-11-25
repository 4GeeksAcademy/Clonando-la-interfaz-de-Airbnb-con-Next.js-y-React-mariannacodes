interface GuestCounterProps {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}

const GuestCounter = ({ value, min, max, onChange }: GuestCounterProps) => (
  <div className="flex items-center gap-3">
    <button type="button" aria-label="Reducir huéspedes" disabled={value <= min} onClick={() => onChange(value - 1)}
      className="h-8 w-8 rounded-full border border-gray-300 disabled:opacity-40">−</button>
    <span className="min-w-4 text-center">{value}</span>
    <button type="button" aria-label="Aumentar huéspedes" disabled={value >= max} onClick={() => onChange(value + 1)}
      className="h-8 w-8 rounded-full border border-gray-300 disabled:opacity-40">+</button>
  </div>
);

export default GuestCounter;

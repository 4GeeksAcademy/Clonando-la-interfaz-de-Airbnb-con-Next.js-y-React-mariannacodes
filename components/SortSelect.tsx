import type { SortOption } from "@/types/listing";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options: { value: SortOption; label: string }[] = [
  { value: "price-asc", label: "Precio ↑" },
  { value: "price-desc", label: "Precio ↓" },
  { value: "rating", label: "Valoración" },
];

const SortSelect = ({ value, onChange }: SortSelectProps) => (
  <div aria-label="Ordenar alojamientos" className="flex flex-wrap gap-2">
    {options.map((option) => (
      <button key={option.value} type="button" onClick={() => onChange(option.value)}
        className={`rounded-full px-4 py-2 text-sm ${value === option.value ? "bg-gray-900 text-white" : "border border-gray-200 bg-white text-gray-700"}`}>
        {option.label}
      </button>
    ))}
  </div>
);

export default SortSelect;

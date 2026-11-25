import type { Category } from "@/types/listing";

interface CategoryBarProps {
  categories: Category[];
  active: string;
  onSelect: (id: string) => void;
}

const CategoryBar = ({ categories, active, onSelect }: CategoryBarProps) => (
  <nav aria-label="Categorías" className="relative z-10 mx-5 -mt-6 rounded-2xl bg-white p-3 shadow-sm">
    <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <button key={category.id} type="button" onClick={() => onSelect(category.id)}
          className={`flex shrink-0 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs ${active === category.id ? "bg-gray-900 text-white" : "text-gray-600"}`}>
          <span className="text-lg">{category.icon}</span>
          {category.label}
        </button>
      ))}
    </div>
  </nav>
);

export default CategoryBar;

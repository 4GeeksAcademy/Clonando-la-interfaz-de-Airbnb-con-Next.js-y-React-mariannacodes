interface AmenityListProps {
  amenities: string[];
}

const amenityIcons: Record<string, string> = {
  "Wi-Fi": "📶", Piscina: "🏊", Desayuno: "🥐", "Aire acondicionado": "❄️",
  Lavadora: "🧺", Cocina: "🍳", Parking: "🅿️", Calefacción: "🔥",
};

const AmenityList = ({ amenities }: AmenityListProps) => (
  <section className="space-y-3">
    <h2 className="text-lg font-semibold">Lo que ofrece este lugar</h2>
    <div className="flex flex-wrap gap-4">
      {amenities.map((amenity) => (
        <div key={amenity} className="flex w-20 flex-col items-center gap-2 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">{amenityIcons[amenity] ?? "✨"}</span>
          <span className="text-xs text-gray-500">{amenity}</span>
        </div>
      ))}
    </div>
  </section>
);

export default AmenityList;

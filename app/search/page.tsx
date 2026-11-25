"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import CategoryBar from "@/components/CategoryBar";
import ListingCard from "@/components/ListingCard";
import MapPlaceholder from "@/components/MapPlaceholder";
import SearchHeader from "@/components/SearchHeader";
import SortSelect from "@/components/SortSelect";
import { categories } from "@/data/listings";
import { fetchListings } from "@/lib/api";
import type { Listing, SortOption } from "@/types/listing";

const SearchPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("price-asc");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchListings().then((data) => {
      setListings(data);
      setLoading(false);
    });
  }, []);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filtered = listings.filter((listing) =>
    (activeCategory === "all" || listing.category === activeCategory) &&
    `${listing.title} ${listing.location}`.toLocaleLowerCase().includes(normalizedQuery));
  const sorted = [...filtered].sort((a, b) => sort === "price-asc" ? a.pricePerNight - b.pricePerNight
    : sort === "price-desc" ? b.pricePerNight - a.pricePerNight : b.rating - a.rating);

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <SearchHeader query={query} onChange={setQuery} />
      <div className="mx-auto max-w-6xl">
        <CategoryBar categories={categories} active={activeCategory} onSelect={setActiveCategory} />
        <div className="grid gap-6 px-5 pt-5 lg:grid-cols-2">
          <section className="min-w-0">
            <SortSelect value={sort} onChange={setSort} />
            <p className="my-4 text-sm text-gray-500">{sorted.length} alojamientos</p>
            {loading ? <p className="py-8 text-center text-gray-500">Cargando alojamientos…</p>
              : sorted.length === 0 ? <p className="py-8 text-center text-gray-500">No hay resultados para «{query}»</p>
                : <div className="grid gap-4 md:grid-cols-2">{sorted.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>}
          </section>
          <aside className="lg:sticky lg:top-4 lg:self-start"><MapPlaceholder /></aside>
        </div>
      </div>
      <BottomNav />
    </main>
  );
};

export default SearchPage;

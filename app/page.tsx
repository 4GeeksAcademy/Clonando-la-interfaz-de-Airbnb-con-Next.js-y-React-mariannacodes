"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import CategoryBar from "@/components/CategoryBar";
import HomeHeader from "@/components/HomeHeader";
import ListingCard from "@/components/ListingCard";
import MapButton from "@/components/MapButton";
import PriceToggle from "@/components/PriceToggle";
import { categories } from "@/data/listings";
import { fetchListings } from "@/lib/api";
import type { Listing } from "@/types/listing";

const Home = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showTotal, setShowTotal] = useState(false);

  useEffect(() => {
    fetchListings().then((data) => {
      setListings(data);
      setLoading(false);
    });
  }, []);

  const visible = activeCategory === "all" ? listings : listings.filter((listing) => listing.category === activeCategory);

  return (
    <main className="min-h-screen bg-gray-50 pb-28">
      <div className="mx-auto max-w-6xl">
        <HomeHeader userName="Marianna" location="Madrid, España" />
        <CategoryBar categories={categories} active={activeCategory} onSelect={setActiveCategory} />
        <div className="py-4"><PriceToggle enabled={showTotal} onToggle={() => setShowTotal(!showTotal)} /></div>
        {loading ? <p className="px-5 py-8 text-center text-gray-500">Cargando alojamientos…</p>
          : visible.length === 0 ? <p className="px-5 py-8 text-center text-gray-500">No hay alojamientos en esta categoría</p>
            : <section className="grid gap-4 px-5 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((listing) => <ListingCard key={listing.id} listing={listing} showTotal={showTotal} />)}
            </section>}
      </div>
      <MapButton />
      <BottomNav />
    </main>
  );
};

export default Home;
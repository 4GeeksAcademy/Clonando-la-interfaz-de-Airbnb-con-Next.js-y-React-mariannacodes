"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AmenityList from "@/components/AmenityList";
import BookingCard from "@/components/BookingCard";
import DetailHeader from "@/components/DetailHeader";
import Gallery from "@/components/Gallery";
import HostCard from "@/components/HostCard";
import { fetchListingById } from "@/lib/api";
import { plural } from "@/lib/format";
import type { Listing } from "@/types/listing";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListingById(id).then((result) => {
      setListing(result);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <main className="grid min-h-screen place-items-center bg-gray-50">Cargando alojamiento…</main>;
  if (!listing) return <main className="grid min-h-screen place-items-center bg-gray-50"><div className="text-center"><p>Alojamiento no encontrado</p><Link className="mt-3 inline-block text-brand underline" href="/">Volver al inicio</Link></div></main>;

  return (
    <main className="min-h-screen bg-gray-50 pb-28 lg:pb-8">
      <DetailHeader title={listing.title} />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 px-5 pt-5 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <Gallery images={listing.images} title={listing.title} />
            <section className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="text-xl font-semibold">{listing.title}</h2>
              <p className="text-sm text-gray-500">📍 {listing.location}</p>
              <p><span className="text-brand">★</span> {listing.rating} <span className="text-sm text-gray-500">({listing.reviews} reseñas)</span></p>
              <p className="text-sm text-gray-500">{plural(listing.rooms, "habitación", "habitaciones")} · {plural(listing.beds, "cama", "camas")} · {plural(listing.guests, "huésped", "huéspedes")} · {plural(listing.bathrooms, "baño", "baños")}</p>
            </section>
            <section className="rounded-2xl bg-white p-4 shadow-sm"><AmenityList amenities={listing.amenities} /></section>
            <HostCard host={listing.host} />
            <section className="space-y-2 rounded-2xl bg-white p-4 shadow-sm"><h2 className="font-semibold">Acerca de este alojamiento</h2><p className="text-sm leading-6 text-gray-600">{listing.description}</p></section>
          </div>
          <BookingCard pricePerNight={listing.pricePerNight} location={listing.location} maxGuests={listing.guests} />
        </div>
      </div>
    </main>
  );
};

export default RoomDetail;

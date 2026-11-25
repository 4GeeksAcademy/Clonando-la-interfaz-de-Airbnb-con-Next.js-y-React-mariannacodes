import Image from "next/image";
import Link from "next/link";
import { plural } from "@/lib/format";
import type { Listing } from "@/types/listing";

interface ListingCardProps {
  listing: Listing;
  showTotal?: boolean;
}

const ListingCard = ({ listing, showTotal = false }: ListingCardProps) => (
  <Link href={`/rooms/${listing.id}`} className="block rounded-2xl bg-white p-3 shadow-sm">
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
      <Image src={listing.images[0]} alt={listing.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
      <span aria-label="Favorito" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white">❤️</span>
    </div>
    <div className="mt-3 flex items-start justify-between gap-2">
      <div>
        <p className="text-sm text-gray-500">📍 {listing.location}</p>
        <h2 className="font-semibold text-gray-900">{listing.title}</h2>
      </div>
      <p className="shrink-0 text-sm"><span className="text-brand">★</span> {listing.rating} <span className="text-gray-500">({listing.reviews})</span></p>
    </div>
    <p className="text-sm text-gray-500">
      {plural(listing.rooms, "habitación", "habitaciones")} · {plural(listing.beds, "cama", "camas")} · {plural(listing.guests, "huésped", "huéspedes")} · {plural(listing.bathrooms, "baño", "baños")}
    </p>
    <p className="mt-2"><span className="font-semibold">{showTotal ? listing.pricePerNight * 2 : listing.pricePerNight} €</span>{" "}
      <span className="text-sm text-gray-500">{showTotal ? "total (2 noches)" : "/ noche"}</span>
    </p>
  </Link>
);

export default ListingCard;

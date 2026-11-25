"use client";

import { useState } from "react";
import GuestCounter from "@/components/GuestCounter";

interface BookingCardProps {
  pricePerNight: number;
  location: string;
  maxGuests: number;
}

const BookingCard = ({ pricePerNight, location, maxGuests }: BookingCardProps) => {
  const [guests, setGuests] = useState(1);
  const total = pricePerNight * 3;

  return (
    <section className="space-y-4 rounded-2xl bg-white p-5 shadow-sm lg:sticky lg:top-6">
      <h2 className="text-lg font-semibold">Reserva tu estancia</h2>
      <p className="flex items-center gap-3 text-sm">📅 <span>3 noches</span></p>
      <p className="flex items-center gap-3 text-sm">📍 <span>{location}</span></p>
      <div className="flex items-center justify-between gap-3 text-sm"><span>👥 Huéspedes</span><GuestCounter value={guests} min={1} max={maxGuests} onChange={setGuests} /></div>
      <p className="flex items-center gap-3 border-t pt-4">💰 <span className="font-semibold">{total} € total</span></p>
      <button type="button" className="fixed inset-x-5 bottom-4 z-20 w-[calc(100%-2.5rem)] rounded-full bg-brand py-4 font-semibold text-white lg:static lg:w-full">Reservar</button>
    </section>
  );
};

export default BookingCard;

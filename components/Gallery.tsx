"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryProps {
  images: string[];
  title: string;
}

const Gallery = ({ images, title }: GalleryProps) => {
  const [index, setIndex] = useState(0);
  const previous = () => setIndex((current) => (current - 1 + images.length) % images.length);
  const next = () => setIndex((current) => (current + 1) % images.length);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
      {images[index] && <Image src={images[index]} alt={title} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" />}
      <button type="button" aria-label="Foto anterior" onClick={previous} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90">‹</button>
      <button type="button" aria-label="Foto siguiente" onClick={next} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90">›</button>
      <button type="button" aria-label="Añadir a favoritos" className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90">❤️</button>
      <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white">{index + 1} / {images.length}</span>
    </div>
  );
};

export default Gallery;

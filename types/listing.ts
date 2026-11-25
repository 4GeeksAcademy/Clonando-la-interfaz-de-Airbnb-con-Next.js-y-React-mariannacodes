export interface Host {
  name: string;
  avatar: string;
  yearsHosting: number;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  images: string[];
  rooms: number;
  beds: number;
  guests: number;
  bathrooms: number;
  pricePerNight: number;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  amenities: string[];
  host: Host;
}

export type SortOption = "price-asc" | "price-desc" | "rating";

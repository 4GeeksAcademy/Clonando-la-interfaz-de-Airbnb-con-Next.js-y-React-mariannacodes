import { listings } from "@/data/listings";
import type { Listing } from "@/types/listing";

export const fetchListings = (): Promise<Listing[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(listings), 500);
  });

export const fetchListingById = (id: string): Promise<Listing | undefined> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(listings.find((listing) => listing.id === id)), 500);
  });

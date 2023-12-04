import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// twMerge: Utility function to efficiently merge Tailwind CSS classes in JS without style conflicts.
// clsx: A tiny (234B) utility for constructing className strings conditionally.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  console.log(twMerge(clsx(inputs)));
  return twMerge(clsx(inputs));
}

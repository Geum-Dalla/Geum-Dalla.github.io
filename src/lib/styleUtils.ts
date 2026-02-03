import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function onMd(styles: ClassValue): string {
  return twMerge(clsx(styles))
    .split(" ")
    .map((s) => `md:${s}`)
    .join(" ");
}

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function checkIsValidArray(value) {
  return Array.isArray(value) && value.length > 0;
}

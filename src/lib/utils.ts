import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function objectKeys<T extends object>(object: T): (keyof T)[] {
  return Object.keys(object) as (keyof T)[];
}

export function objectEntries<T extends object>(object: T) {
  return Object.entries(object) as {
    [K in keyof T]: [K, T[K]];
  }[keyof T][];
}

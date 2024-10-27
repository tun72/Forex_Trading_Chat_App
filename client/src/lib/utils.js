import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottie-json";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
];

export const getColor = (color = 0) => {
  if (color < colors.length) {
    return colors[color];
  }
};

export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
};

import { urlRegex } from "./constants";

export function formatNumber(num: string | number) {
  num = Number(num);

  if (isNaN(num)) return 0;

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return formatter.format(num);
}

export function isValidUrl(url: string) {
  return urlRegex.test(url);
}

export function roundUpToDecimalPlace(
  number: string | number,
  decimalPlaces: number
) {
  number = Number(number);

  const factor = 10 ** decimalPlaces;
  return Math.ceil(number * factor) / factor;
}

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

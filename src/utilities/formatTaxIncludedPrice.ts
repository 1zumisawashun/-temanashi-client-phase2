export const formatTaxIncludedPrice = (
  price: number,
  taxRate?: number
): string => {
  const localTaxRate = taxRate ?? 1.1;
  return `¥${Math.round(price * (1 + localTaxRate / 100)).toLocaleString()}`;
};

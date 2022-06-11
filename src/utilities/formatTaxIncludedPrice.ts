export const formatTaxIncludedPrice = (price: number, taxRate?: number): string => {
  const useTaxRate = 1.1;
  taxRate = useTaxRate;
  return `¥${Math.round(price * (1 + taxRate / 100)).toLocaleString()}`;
};

export function parseCurrency(amount: string) {
  return parseFloat(amount.replace(/,/g, "").replace(/\./g, ""));
}

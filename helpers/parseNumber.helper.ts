function parseNumber(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return isNaN(parsed) ? null : parsed;
}

export default parseNumber;

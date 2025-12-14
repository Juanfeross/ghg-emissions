export function getCSSVariableValue(variable: string): string {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return '#000000';
  }
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(variable).trim();
  if (value && !value.startsWith('hsl')) {
    return `hsl(${value})`;
  }
  return value || '#000000';
}


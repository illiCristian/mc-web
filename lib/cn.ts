/* Utilidad para combinar clases condicionalmente.
   Estilo clsx minimalista sin dependencias externas. */
export type ClassValue = string | number | null | boolean | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (value: ClassValue): void => {
    if (!value && value !== 0) return;
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
    }
  };
  inputs.forEach(walk);
  return out.join(" ");
}

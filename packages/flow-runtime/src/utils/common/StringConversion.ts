export function convertToPascalCase(text: string): string {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

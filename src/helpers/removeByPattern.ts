export function removeByPattern(
  text:string,
  pattern: RegExp,
): string {
  return text.replaceAll(pattern, '');
}

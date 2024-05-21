export function isValidLetter(strValue: string): boolean {
  return /^[A-Za-zА-ЩЬ-ЯҐЄІЇа-щью-яґєії0-9 ]+$/.test(strValue);
}

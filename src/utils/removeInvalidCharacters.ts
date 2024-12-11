const enAbc = 'abcdefghijklmnopqrstuvwxyz';
const uaAbc = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя';
const digits = '123456789';
const symbols = " '`";
const allowedCharacters = enAbc + uaAbc + digits + symbols;

export function removeInvalidCharacters(str: string): string {
  const trimmedStr = str.trim();
  let validStr = '';

  for (let i = 0; i < trimmedStr.length; i++) {
    if (allowedCharacters.includes(trimmedStr[i].toLowerCase())) {
      validStr += trimmedStr[i];
    }
  }

  return validStr;
}

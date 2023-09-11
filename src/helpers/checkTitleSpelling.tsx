export const checkTitleSpelling = (enteredTitle: string) => {
  let preparedTitle = '';

  for (let i = 0; i < enteredTitle.length; i += 1) {
    const charCode = enteredTitle.charCodeAt(i);

    if (charCode === 32
      || charCode === 1100
      || charCode === 1108
      || charCode === 1110
      || charCode === 1111
      || (charCode > 47 && charCode < 58)
      || (charCode > 64 && charCode < 91)
      || (charCode > 96 && charCode < 123)
      || (charCode > 1025 && charCode < 1066)
      || (charCode > 1069 && charCode < 1098)
      || (charCode > 1101 && charCode < 1105)) {
      preparedTitle += enteredTitle[i];
    }
  }

  return preparedTitle;
};

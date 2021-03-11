export const FormValidation = (name, select) => {
  const isValidInput = !!name || !!name.trim();

  const isSelectValid = !!select;

  return [isValidInput, isSelectValid];
};

import { FormValues } from '../types/FormValues';

export const formValidation = (values: FormValues): boolean => {
  let valid = true;

  for (const key in values) {
    if (values[key].trim() === '') {
      valid = false;
      break;
    }

    if (key === 'userId' && values[key] === '0') {
      valid = false;
      break;
    }
  }

  return valid;
};

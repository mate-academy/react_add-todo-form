import { Form, FormError } from '../types/Form';

import { pattern } from '../constants/pattern';

export const validateForm = ({ title, userId }: Form): FormError => {
  const errors: FormError = {};

  if (!title) {
    errors.title = 'Please enter a title';
  } else if (!pattern.test(title)) {
    errors.title = 'Please enter only letters (ua and en), digits, and spaces';
  }

  if (!userId) {
    errors.userId = 'Please choose a user';
  }

  return errors;
};

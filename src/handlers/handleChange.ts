/* eslint-disable prettier/prettier */

import { FormDataFields } from '../types/FormDataFields';

/* eslint-disable max-len */
export const handleChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setFormState: React.Dispatch<React.SetStateAction<FormDataFields>>,
) => {
  const { name, value } = event.target;

  setFormState(prevState => ({
    ...prevState,
    [name]: value,
  }));
};

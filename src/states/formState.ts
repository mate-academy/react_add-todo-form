/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

export const UseFormState = () => {
  const [formState, setFormState] = useState({
    title: '',
    userValue: 0,
  });

  return [formState, setFormState] as const;
};

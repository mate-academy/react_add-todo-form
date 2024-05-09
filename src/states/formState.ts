import { useState } from 'react';

export const useFormState = () => {
  const [formState, setFormState] = useState({
    title: '',
    userValue: 0,
  });

  return [formState, setFormState] as const;
};

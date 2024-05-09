import { useState } from 'react';

export const useTouchedState = () => {
  const [touchedState, setTouchedState] = useState({
    title: false,
    userValue: false,
  });

  return [touchedState, setTouchedState] as const;
};

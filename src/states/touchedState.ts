import { useState } from 'react';

// interface UseTouchedStateProps {
//   key: keyof TouchedDataValues;
//   value: true | false;
// }

export const useTouchedState = () => {
  const [touchedState, setTouchedState] = useState({
    title: false,
    userValue: false,
  });

  return [touchedState, setTouchedState] as const;
};

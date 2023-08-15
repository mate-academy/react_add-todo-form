import React from 'react';

export const changeTheme = (
  theme: 'light' | 'dark',
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>,
): void => {
  if (theme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
};

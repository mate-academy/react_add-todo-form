import React from 'react';
import './Error.scss';

export const SelectError = () => (
  <span className="error error--select">
    Please choose a user
  </span>
);

export const TextAreaError = () => (
  <span className="error error--text-area">
    Please enter the title
  </span>
);

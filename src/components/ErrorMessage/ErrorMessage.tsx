import React from 'react';
import './ErrorMessage.css';

type Props = {
  error: string;
};

export const ErrorMessage: React.FC<Props> = ({ error }) => {
  return (
    <div className="error__message">
      {error === 'title'
        ? 'Please enter the title!'
        : 'Please choose a user!'}
    </div>
  );
};

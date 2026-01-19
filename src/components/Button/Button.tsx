import React from 'react';

type Props = {
  type?: 'submit' | 'reset' | 'button';
  content: string;
};

export const Button: React.FC<Props> = ({ type, content }) => {
  return (
    <button type={type} data-cy="submitButton">
      {content}
    </button>
  );
};

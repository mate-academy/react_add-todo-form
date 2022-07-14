import React from 'react';

type Props = {
  title: string;
  isCompleted: boolean;
};

export const TodoInfo: React.FC<Props> = ({ title, isCompleted }) => (
  <>
    <h2 className="subtitle is-2">{title}</h2>
    <p className="subtitle is-5 has-text-danger">
      {isCompleted ? 'Done' : 'Not completed!'}
    </p>
  </>
);

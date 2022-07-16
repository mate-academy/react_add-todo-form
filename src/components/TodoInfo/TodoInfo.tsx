import React from 'react';

type Prop = {
  title: string;
  completed: boolean;
};

export const TodoInfo: React.FC<Prop> = ({ title, completed }) => (
  <>
    <h2 data-cy="title">{title}</h2>
    <p data-cy="status">
      {completed ? ('Done') : ('Not completed!')}
    </p>
  </>
);

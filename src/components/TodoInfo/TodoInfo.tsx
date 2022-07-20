import React from 'react';

type Props = {
  title: string,
  completed: boolean,
};

export const TodoInfo: React.FC<Props> = ({ title, completed }) => (
  <>
    <h2 className="list__item-title" data-cy="title">{title}</h2>
    <p data-cy="status">
      {completed
        ? 'Complited'
        : 'The task is not finished'}
    </p>
  </>
);

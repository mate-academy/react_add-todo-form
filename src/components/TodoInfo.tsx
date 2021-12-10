import React from 'react';

type Props = {
  title: string;
  completed: boolean;
};

export const TodoInfo: React.FC<Props> = ({ title, completed }) => (
  <>
    <span className="todo-title">{`todo: ${title} - `}</span>
    <span className="todo-status">{completed ? 'completed' : 'no completed'}</span>
  </>
);

import React from 'react';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;

  return (
    <div className="todo">
      <p className="todo__title">
        {`Task: ${title}`}
      </p>
      <p className="todo__status">
        {!completed && 'Status: In progress'}
      </p>
    </div>
  );
};

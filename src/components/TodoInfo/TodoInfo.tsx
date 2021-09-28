import React from 'react';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = (props) => {
  const { todo } = props;

  return (
    <>
      <ul>
        <li>
          Task:
          {' '}
          {todo.title}
        </li>
        <li>
          Status:
          {' '}
          {todo.completed ? 'Completed' : 'In process'}
        </li>
      </ul>
    </>
  );
};

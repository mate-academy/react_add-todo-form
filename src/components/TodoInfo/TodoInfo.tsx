import React from 'react';

type Props = {
  todo: TodoItem;
};

export const TodoInfo: React.FC<Props> = (props) => {
  const { title, completed } = props.todo;

  return (
    <>
      <p>
        <strong>Task: </strong>
        {title}
      </p>
      <p>
        <strong>Completed: </strong>
        {completed ? 'This task is complete' : 'This task is not complete'}
      </p>
    </>
  );
};

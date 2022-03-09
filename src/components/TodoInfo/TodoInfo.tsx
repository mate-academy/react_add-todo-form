import React from 'react';
import { Todo } from '../../type/todo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <>
      {`${todo.title} - ${todo.completed}`}
    </>
  );
};

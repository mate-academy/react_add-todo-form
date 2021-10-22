import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    TASK:
    {' '}
    {todo.title}
    {' '}
    {todo.completed ? 'DONE' : 'IN PROCESS'}
  </>
);

import React from 'react';
import { Todo } from './types/types';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <p>{`Todo id: ${todo.id}`}</p>
    <h2>{todo.title}</h2>
    <p>{`User id: ${todo.userId}`}</p>
  </>
);

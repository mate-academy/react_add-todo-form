import React from 'react';
import { TODO } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TODO[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
